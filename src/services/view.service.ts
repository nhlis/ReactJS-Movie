import { movieApi } from '@/configs';
import { httpMovieClient } from '@/utils/http';

export class ViewService {
    static async postView(payload: { visitor_id: string; overview_id: string; episode_id: string }): Promise<void> {
        await httpMovieClient.post(movieApi.views, { ...payload });
    }
}
