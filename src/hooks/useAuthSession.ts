import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useAuthStore from '../stores/auth.store';
import { AuthService } from '../services/auth.service';
import { EAuthState } from '../enums';
import { ProfileService } from '../services/profile.service';

export function useAuthSession() {
    const { setAuthStore, authuser: authuserFromStore, tokens } = useAuthStore();

    const {
        data: sessions,
        error: accountError,
        isFetched: isFetchedAccounts,
    } = useQuery({
        queryKey: ['ssaccs'],
        queryFn: () => {
            return AuthService.getSessionAccounts();
        },
    });

    const authuser = sessions?.accounts?.find((a) => a.primary)?.authuser;
    const primary_account = sessions?.accounts?.find((a) => a.primary);
    const shouldFetchToken = authuser != null && primary_account?.state === EAuthState.SIGNED_IN;

    const {
        data: token,
        error: tokenError,
        isFetched: isFetchedToken,
    } = useQuery({
        queryKey: ['access_token', authuser],
        queryFn: () => AuthService.getToken(authuser!),
        enabled: shouldFetchToken,
        staleTime: Infinity,
    });

    const isFetched = isFetchedAccounts && (!shouldFetchToken || (shouldFetchToken && isFetchedToken));

    useEffect(() => {
        if (!isFetched) {
            setAuthStore({ is_fetched: false });
            return;
        }

        if (accountError || tokenError || !token || primary_account?.state !== EAuthState.SIGNED_IN) {
            if (sessions?.is_session_available) {
                setAuthStore({ is_login: false, is_session: true, is_fetched: true });
            } else {
                setAuthStore({ is_login: false, is_session: false, is_fetched: true });
            }
        } else {
            setAuthStore({
                is_login: true,
                list_account: sessions?.accounts,
                authuser,
                tokens: { [authuser!]: token },
                is_fetched: true,
            });
        }
    }, [isFetched, accountError, tokenError, token, sessions, authuser, setAuthStore]);

    const { data: dataProfile } = useQuery({
        queryKey: ['profile', authuser],
        queryFn: () => ProfileService.getProfile(),
        enabled: authuserFromStore !== undefined,
    });

    useEffect(() => {
        if (dataProfile?.profile) {
            setAuthStore((prev) => ({
                ...prev,
                profile: dataProfile.profile,
            }));
        }
    }, [dataProfile?.profile, setAuthStore]);

    useEffect(() => {
        const token = tokens?.[authuserFromStore ?? -1];

        if (authuserFromStore !== undefined && !token) {
            AuthService.getToken(authuserFromStore)
                .then((newToken) => {
                    setAuthStore((prev: any) => ({
                        tokens: {
                            ...prev.tokens,
                            [authuserFromStore]: newToken,
                        },
                    }));
                })
                .catch((error) => {
                    console.error('Failed to fetch token for authuser:', authuserFromStore, error);
                });
        }
        if (authuserFromStore !== undefined && tokens && tokens[authuserFromStore]) {
            ProfileService.getProfile()
                .then((data) => {
                    setAuthStore((prev) => ({
                        ...prev,
                        profile: data.profile,
                    }));
                })
                .catch((error) => {
                    console.error('Failed to fetch profile for authuser:', authuserFromStore, error);
                });
        }
    }, [authuserFromStore, tokens, setAuthStore]);
}
