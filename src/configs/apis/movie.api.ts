export const movieApi = {
    overviews: 'overviews',
    overviews_by_ids: 'overviews/arr',
    overviews_search: 'overviews/search',

    profile: 'profiles/info',

    seasons_by_overview_id: (overview_id: string) => `seasons/overview/${overview_id}`,

    episodes_by_seasons_id: (season_id: string) => `episodes/season/${season_id}`,
    episode_uri: (episode_id: string) => `episodes/${episode_id}`,
    episodes_context: (episode_id: string) => `episodes/context/${episode_id}`,

    comments_by_episode_id: (episode_id: string) => `comments/episode/${episode_id}`,
    comments_by_parent_comment_id: (comment_id: string) => `comments/child/${comment_id}`,
    comment: '/comments',
    patch_comment: (comment_id: string) => `/comments/${comment_id}`,
    delete_comment: (comment_id: string) => `/comments/${comment_id}`,

    bookmark: '/bookmarks',
    delete_bookmark: (overview_id: string) => `/bookmarks/${overview_id}`,

    post_reaction: '/reactions',
    delete_reaction: (entity_id: string) => `/reactions/${entity_id}`,

    rating: '/ratings',
    delete_rating: (overview_id: string) => `/ratings/overview/${overview_id}`,

    search_history: '/search-history',

    history: '/histories',
    delete_history: (_id: string) => `/histories/${_id}`,

    views: '/views',
};
