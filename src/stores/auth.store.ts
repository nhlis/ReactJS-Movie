import { create } from 'zustand';
import { ISessionAccount } from '@/interfaces/auth.interface';
import { IProfileResponse } from '@/interfaces/profile.interface';

interface AuthState {
    is_fetched: boolean;
    is_login: boolean;
    is_modal: boolean;
    is_session: boolean;
    list_account: ISessionAccount[];
    authuser?: number;
    profile?: IProfileResponse;
    tokens?: {
        [key: number]: string;
    };
}

interface AuthAction {
    setAuthStore: (state: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => void;
}

const initialState: AuthState = {
    is_fetched: false,
    is_login: false,
    is_modal: false,
    is_session: false,
    list_account: [],
    authuser: undefined,
    profile: undefined,
    tokens: undefined,
};

const useAuthStore = create<AuthState & AuthAction>((set) => ({
    ...initialState,
    setAuthStore: (newStateOrUpdater) => {
        set((prevState) => {
            const newState = typeof newStateOrUpdater === 'function' ? newStateOrUpdater(prevState) : newStateOrUpdater;
            return {
                ...prevState,
                ...newState,
            };
        });
    },
}));

// useAuthStore.subscribe((state) => {
//     console.log('New store state:', state);
// });

export default useAuthStore;
