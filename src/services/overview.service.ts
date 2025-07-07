import { movieApi } from '@/configs/apis/movie.api';
import { EMovieGenre, EMovieSort } from '@/enums';
import { IOverviewResponse } from '@/interfaces/overview.interface';
import { httpMovieClient } from '@/utils/http';
import { getDateFromSeason } from '@/utils/get-date-from-season';
import { getSeason } from '@/utils/get-season';

export class OverviewService {
    static async getOverviewsHeroSlides(limit: number): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params: { limit, release_date: EMovieSort.DESC } });

        return { overviews, hasMore };
    }

    static async getOverviewsTopPick(limit: number): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params: { limit, most_rated: EMovieSort.DESC, highest_rated: EMovieSort.DESC } });

        return { overviews, hasMore };
    }

    static async getOverviewsNewSeason(limit: number): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const { name, year } = getSeason();
        const { start, end } = getDateFromSeason(name, year);

        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params: { limit, start_date: start, end_date: end } });

        return { overviews, hasMore };
    }

    static async getOverviewsSimulcastSeason(limit: number, start_date: Date, end_date: Date, last_id?: string): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const params: any = { limit, start_date: start_date, end_date: end_date };
        if (last_id) params.last_id = last_id;

        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params });

        return { overviews, hasMore };
    }

    static async getOverviewsLastedRelease(limit: number, last_id?: string): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const params: any = { limit, release_date: EMovieSort.DESC };
        if (last_id) params.last_id = last_id;

        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params });

        return { overviews, hasMore };
    }

    static async getOverviewsPopular(limit: number, last_id?: string): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const params: any = { limit, most_viewed: EMovieSort.DESC };
        if (last_id) params.last_id = last_id;

        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params });

        return { overviews, hasMore };
    }

    static async getOverviewsGloombusters(limit: number): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params: { limit, genres: EMovieGenre.ADVENTURE } });

        return { overviews, hasMore };
    }

    static async getOverviewsByGenres(limit: number, genres: EMovieGenre[], type: 'popular' | 'new', last_id?: string): Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }> {
        const genresParam = genres.join(' ');
        const params: any = { limit, genres: genresParam };
        if (type === 'popular') {
            params.most_rated = EMovieSort.DESC;
            params.highest_rated = EMovieSort.DESC;
        } else {
            params.release_date = EMovieSort.DESC;
        }
        if (last_id) params.last_id = last_id;

        const { overviews, hasMore }: any = await httpMovieClient.get(movieApi.overviews, { params });

        return { overviews, hasMore };
    }

    static async getOverviewsByIds(overview_ids: string[]): Promise<{ overviews: IOverviewResponse[] }> {
        const overview_ids_params = overview_ids.join(' ');
        const params: any = { ids: overview_ids_params };

        const { overviews }: any = await httpMovieClient.get(movieApi.overviews_by_ids, { params });

        return { overviews };
    }

    static async searchOverviews(keyword: string): Promise<{ overviews: IOverviewResponse[] }> {
        const { overviews }: any = await httpMovieClient.get(movieApi.overviews_search, { params: { keyword } });

        return { overviews };
    }
}
