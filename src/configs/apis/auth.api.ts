export const authApi = {
    session: 'ssaccs',
    token: (authuser: number) => `tokens/auth/${authuser}`,
};
