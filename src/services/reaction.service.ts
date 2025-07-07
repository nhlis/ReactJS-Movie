import { movieApi } from '@/configs';
import { EReactionType } from '@/enums';
import { EEntityType } from '@/enums/movie/entity-type.movie.enum';
import { httpMovieClient } from '@/utils/http';

export class ReactionService {
    static async postReactionLikeEpisode(payload: { entity_id: string }) {
        return httpMovieClient.post(movieApi.post_reaction, { entity_id: payload.entity_id, entity_type: EEntityType.EPISODE, reaction_type: EReactionType.LIKE });
    }

    static async postReactionDislikeEpisode(payload: { entity_id: string }) {
        return httpMovieClient.post(movieApi.post_reaction, { entity_id: payload.entity_id, entity_type: EEntityType.EPISODE, reaction_type: EReactionType.DISLIKE });
    }

    static async deleteReactionLikeEpisode(payload: { entity_id: string }) {
        return httpMovieClient.delete(movieApi.delete_reaction(payload.entity_id), { params: { entity_type: EEntityType.EPISODE, reaction_type: EReactionType.LIKE } });
    }

    static async deleteReactionDislikeEpisode(payload: { entity_id: string }) {
        return httpMovieClient.delete(movieApi.delete_reaction(payload.entity_id), { params: { entity_type: EEntityType.EPISODE, reaction_type: EReactionType.DISLIKE } });
    }

    static async postReactionLikeComment(payload: { entity_id: string }) {
        return httpMovieClient.post(movieApi.post_reaction, { entity_id: payload.entity_id, entity_type: EEntityType.COMMENT, reaction_type: EReactionType.LIKE });
    }

    static async postReactionDislikeComment(payload: { entity_id: string }) {
        return httpMovieClient.post(movieApi.post_reaction, { entity_id: payload.entity_id, entity_type: EEntityType.COMMENT, reaction_type: EReactionType.DISLIKE });
    }

    static async deleteReactionLikeComment(payload: { entity_id: string }) {
        return httpMovieClient.delete(movieApi.delete_reaction(payload.entity_id), { params: { entity_type: EEntityType.COMMENT, reaction_type: EReactionType.LIKE } });
    }

    static async deleteReactionDislikeComment(payload: { entity_id: string }) {
        return httpMovieClient.delete(movieApi.delete_reaction(payload.entity_id), { params: { entity_type: EEntityType.COMMENT, reaction_type: EReactionType.DISLIKE } });
    }
}
