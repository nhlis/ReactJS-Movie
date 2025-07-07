import { movieApi } from '@/configs';
import { IProfileResponse } from '@/interfaces/profile.interface';
import { httpMovieClient } from '@/utils/http';

export class ProfileService {
    static async getProfile(): Promise<{ profile: IProfileResponse }> {
        const data: any = await httpMovieClient.get(movieApi.profile);

        return { profile: data.profile };
    }
}
