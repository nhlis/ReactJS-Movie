import { authApi } from '../configs';
import { ISessionAccount } from '../interfaces/auth.interface';
import { httpAuthClient } from '../utils/http';

export class AuthService {
    static async getSessionAccounts(): Promise<{ is_session_available: boolean; requires_signin: boolean; accounts: ISessionAccount[] }> {
        const data: any = await httpAuthClient.get(authApi.session);
        return data;
    }

    static async getToken(authuser: number): Promise<string> {
        const data: any = await httpAuthClient.get(authApi.token(authuser));
        return `${data.token_type} ${data.access_token}`;
    }
}
