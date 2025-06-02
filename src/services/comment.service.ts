import { movieApi } from '../configs';
import { EMovieSort } from '../enums';
import { CommentDocument, ICommentRespone } from '../interfaces/comment.interface';
import { httpMovieClient } from '../utils/http';

export class CommentService {
    static async getCommentsByEpisode(episode_id: string, limit: number, last_id: string | undefined, created_at: EMovieSort): Promise<{ comments: ICommentRespone[]; hasMore: boolean }> {
        const { comments, hasMore }: any = await httpMovieClient.get(movieApi.comments_by_episode_id(episode_id), { params: { limit, last_id, created_at } });

        return { comments, hasMore };
    }

    static async getCommentsByParentComment(parent_comment_id: string, limit: number, last_id: string | undefined, created_at: EMovieSort): Promise<{ comments: ICommentRespone[]; hasMore: boolean }> {
        const { comments, hasMore }: any = await httpMovieClient.get(movieApi.comments_by_parent_comment_id(parent_comment_id), { params: { limit, last_id, created_at } });

        return { comments, hasMore };
    }

    static async postComment(payload: { episode_id: string; text: string; parent_id?: string; reply_id?: string; reply_profile_id?: string }): Promise<{ comment: Partial<CommentDocument> }> {
        const { comment }: any = await httpMovieClient.post(movieApi.comment, { ...payload });

        return { comment };
    }

    static async patchComment(payload: { comment_id: string; text: string }): Promise<{ comment: Partial<CommentDocument> }> {
        const { comment }: any = await httpMovieClient.patch(movieApi.patch_comment(payload.comment_id), { text: payload.text });

        return { comment };
    }

    static async deleteComment(payload: { comment_id: string }): Promise<void> {
        await httpMovieClient.delete(movieApi.delete_comment(payload.comment_id));
    }
}
