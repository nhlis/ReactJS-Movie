import { movieApi } from '../configs';
import { ISeason } from '../interfaces/season.interface';
import { httpMovieClient } from '../utils/http';

export class SeasonService {
    static async getSeasonsByOverview(ovevriew_id: string): Promise<{ seasons: ISeason[] }> {
        const data: any = await httpMovieClient.get(movieApi.seasons_by_overview_id(ovevriew_id));
        return { seasons: data.seasons };
    }
}
