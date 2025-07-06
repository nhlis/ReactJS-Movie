import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Style from './components/Style/Style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthThentication from './layouts/Authentication/Authentication';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Style>
            <QueryClientProvider client={queryClient}>
                <AuthThentication>
                    <App />
                </AuthThentication>
            </QueryClientProvider>
        </Style>
    </StrictMode>
);
