import { EMovieGenre } from '../../enums';
import { stringToSlug } from '../../utils/handle-slug';

export const routes = {
    home: '/',
    search: '/search',
    bookmark: '/bookmark',
    history: '/history',
    new: '/new',
    popular: '/popular',
    notification: '/notification',
    switch: '/switch',

    simulcast: '/simulcast/:season',
    simulcastURL: (season: string) => `/simulcast/${season}`,

    genres: '/genres/:genres',
    genreURL: (genres: EMovieGenre) => `/genres/${genres}`,

    overview: '/overview/:overviewWithId',
    overviewURL: (overview_id: string, overview_slug: string) => {
        return `/overview/${stringToSlug(overview_slug)}-${overview_id}`;
    },

    watch: '/watch/:overviewWithId/:episodeWithId',
    watchURL: (overview_id: string, episode_id: string, overview_slug: string, episode_slug: string) => {
        return `/watch/${stringToSlug(overview_slug)}-${overview_id}/${stringToSlug(episode_slug)}-${episode_id}`;
    },
};
