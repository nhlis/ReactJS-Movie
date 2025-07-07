import axios, { AxiosInstance } from 'axios';
import useAuthStore from '@/stores/auth.store';
import { AuthService } from '@/services/auth.service';

const createAxiosInstance = (baseUrl?: string): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: baseUrl,
        withCredentials: true,
    });

    instance.interceptors.request.use(async (config) => {
        const { tokens, authuser } = useAuthStore.getState();
        if (tokens && authuser !== undefined) {
            config.headers.Authorization = tokens[authuser];
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            if (response && response.data) return response.data.data;
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const { authuser, setAuthStore } = useAuthStore.getState();
                if (authuser === undefined) return Promise.reject(new Error('User not authenticated'));
                try {
                    const token: any = await AuthService.getToken(authuser!);

                    const newTokens = { [authuser]: token };
                    setAuthStore({ tokens: newTokens });

                    instance.defaults.headers.common['Authorization'] = token;
                    originalRequest.headers['Authorization'] = token;

                    return instance(originalRequest);
                } catch (error) {
                    console.error('Error fetching new token:', error);
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

const httpAuthClient = createAxiosInstance(import.meta.env.VITE_AUTH_SERVICE);
const httpMovieClient = createAxiosInstance(import.meta.env.VITE_MOVIE_SERVICE);

export { httpAuthClient, httpMovieClient };
