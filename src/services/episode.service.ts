import { movieApi } from '@/configs';
import { EMovieSort } from '@/enums';
import { IEpisodeResponse } from '@/interfaces/episode.interface';
import { httpMovieClient } from '@/utils/http';

export class EpisodeService {
    static async getEpisodesBySeason(season_id: string, limit: number, last_id: string | undefined, release_date: EMovieSort): Promise<{ episodes: IEpisodeResponse[]; hasMore: boolean }> {
        const { episodes, hasMore }: any = await httpMovieClient.get(movieApi.episodes_by_seasons_id(season_id), { params: { limit, last_id, release_date } });

        return { episodes, hasMore };
    }

    static async getEpisodeInContext(episode_id: string): Promise<{ previous?: IEpisodeResponse; current: IEpisodeResponse; next?: IEpisodeResponse }> {
        try {
            const data: any = await httpMovieClient.get(movieApi.episodes_context(episode_id));
            const { previous, current, next } = data.episodes || {};

            return {
                previous,
                current,
                next,
            };
        } catch (error) {
            throw new Error('Error fetching episode context');
        }
    }

    static async getURIEpisode(episode_id: string): Promise<{ uri: string }> {
        const { uri }: any = await httpMovieClient.get(movieApi.episode_uri(episode_id));

        return { uri };
    }
}
