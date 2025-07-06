import { useInfiniteQuery } from '@tanstack/react-query';
import { ICommentRespone } from '../interfaces/comment.interface';
import { EMovieSort } from '../enums';

interface CommentQueryPayload {
    _id: string;
    limit: number;
    cursor?: string;
    sort: EMovieSort;
}

type CommentQueryCallback = (payload: CommentQueryPayload) => Promise<{ comments: ICommentRespone[]; hasMore: boolean }>;

export const useCommentInfinite = (queryKey: any[], callbackFn: CommentQueryCallback, extraPayload: Omit<CommentQueryPayload, 'cursor' | 'limit'>, limit = 5, enabled = true) => {
    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam = null }) => {
            const res = await callbackFn({
                ...extraPayload,
                limit,
                cursor: pageParam || undefined,
            });
            return res;
        },

        getNextPageParam: (lastPage) => {
            if (lastPage.hasMore) {
                return lastPage.comments[lastPage.comments.length - 1]?._id;
            }
            return undefined;
        },
        initialPageParam: null as string | null, // Explicitly type initialPageParam
        enabled: Boolean(enabled),
    });
};
