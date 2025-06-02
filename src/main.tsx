import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Style from './components/Style/Style.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthThentication from './layouts/authentication/Authentication.tsx';

const queryClient = new QueryClient();

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
