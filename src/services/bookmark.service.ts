import { movieApi } from '@/configs';
import { EMovieSort } from '@/enums';
import { IOverviewResponse } from '@/interfaces/overview.interface';
import { httpMovieClient } from '@/utils/http';

export class BookmarkService {
    static async postBookmark(payload: { overview_id: string }): Promise<void> {
        await httpMovieClient.post(movieApi.bookmark, { overview_id: payload.overview_id });
    }

    static async deleteBookmark(payload: { overview_id: string }): Promise<void> {
        await httpMovieClient.delete(movieApi.delete_bookmark(payload.overview_id));
    }

    static async getBookmarks(payload: { created_at: EMovieSort; limit: number; last_id?: string }): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.bookmark, { params: payload });

        return { overviews, hasMore };
    }
}
