import { movieApi } from '@/configs';
import { httpMovieClient } from '@/utils/http';

export class RatingService {
    static async postRating(payload: { overview_id: string; point: number }) {
        return httpMovieClient.post(movieApi.rating, { overview_id: payload.overview_id, point: payload.point });
    }

    static async deleteRating(payload: { overview_id: string }) {
        return httpMovieClient.delete(movieApi.delete_rating(payload.overview_id));
    }
}
