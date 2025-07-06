export const AuthenticationHref = {
    choose_accounts_auth: `${import.meta.env.VITE_AUTH_SERVICE}/InteractiveLogin/signin/chooser?continue=${import.meta.env.VITE_BASE_URL}`,
    select_accounts_oauth2: `${import.meta.env.VITE_AUTH_SERVICE}/o/oauth2/authorize?client_id=000000000000000000&redirect_uri=${
        import.meta.env.VITE_MOVIE_SERVICE
    }/callback&response_type=code%20token%20id_token&scope=openid%20profile&response_mode=query&prompt=consent&access_type=offline&state=xyz789&nonce=random123`,
    signout_accounts: `${import.meta.env.VITE_AUTH_SERVICE}/ssaccs/signout?continue=${import.meta.env.VITE_BASE_URL}`,
};
