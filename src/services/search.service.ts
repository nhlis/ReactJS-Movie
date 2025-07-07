import { movieApi } from '@/configs';
import { IResponeSeachHistory } from '@/interfaces/search-history.interface';
import { httpMovieClient } from '@/utils/http';

export class SearchService {
    static async getSearchHistories(): Promise<{ search_histories: IResponeSeachHistory[]; hasMore: boolean }> {
        const { search_histories, hasMore }: any = await httpMovieClient.get(movieApi.search_history);
        return { search_histories, hasMore };
    }

    static async postSearchHistory(payload: { overview_id: string }): Promise<void> {
        return httpMovieClient.post(movieApi.search_history, { overview_id: payload.overview_id });
    }

    static async deleteSearchHistory(payload: { overview_ids: string[] }): Promise<void> {
        const overviewsParam = payload.overview_ids.join(' ');
        const params: any = { ids: overviewsParam };
        return httpMovieClient.delete(movieApi.search_history, { params });
    }
}
