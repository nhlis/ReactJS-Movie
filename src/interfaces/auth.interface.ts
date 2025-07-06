import { EAuthState } from '../enums';

export interface ISessionAccount {
    authuser: number;
    email: string;
    first_name: string;
    last_name: string;
    img: string;
    primary: boolean;
    state: EAuthState;
}
