import { movieApi } from '../configs';
import { IHistoryRespone } from '../interfaces/history.interface';
import { httpMovieClient } from '../utils/http';

export class HistoryService {
    static async getHistories(payload: { limit: number; last_id?: string }): Promise<{ histories: IHistoryRespone[]; hasMore: boolean }> {
        const { histories, hasMore }: any = await httpMovieClient.get(movieApi.history, { params: payload });
        return { histories, hasMore };
    }

    static async postHistory(payload: { overview_id: string; episode_id: string }): Promise<void> {
        await httpMovieClient.post(movieApi.history, { ...payload });
    }

    static async deleteHistory(payload: { _id: string }): Promise<void> {
        await httpMovieClient.delete(movieApi.delete_history(payload._id));
    }

    static async clearHistories(): Promise<void> {
        await httpMovieClient.delete(movieApi.history);
    }
}
