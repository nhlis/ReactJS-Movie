import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentService } from '@/services/comment.service';
import useAuthStore from '@/stores/auth.store';
import { EMovieSort } from '@/enums';

export const useMutationPostComment = (
    payload: {
        reply_first_name?: string;
        reply_last_name?: string;
        reply_profile_id?: string;
    },
    queryKeys: QueryKey[],
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();
    const { authuser, list_account } = useAuthStore();
    const account = list_account[authuser ?? -1];

    const { mutate: postComment } = useMutation({
        mutationFn: CommentService.postComment,
        onError: (error) => {
            console.error('Error posting comment:', error);
        },
        onSuccess: (data) => {
            const resComment = data.comment;

            const fullComment = {
                ...resComment,
                first_name: account.first_name,
                last_name: account.last_name,
                img: account.img,
                reply_first_name: payload.reply_first_name,
                reply_last_name: payload.reply_last_name,
                reply_profile_id: payload.reply_profile_id,
            };

            const updateFn = (oldData: any) => {
                if (!oldData || !oldData.pages) {
                    return {
                        pages: [{ comments: [fullComment], hasMore: true }],
                        pageParams: [undefined],
                    };
                }

                return {
                    ...oldData,
                    pages: [
                        {
                            comments: [fullComment, ...oldData.pages[0].comments],
                            hasMore: oldData.pages[0].hasMore,
                        },
                        ...oldData.pages.slice(1),
                    ],
                };
            };

            if (resComment.parent_id) {
                // Tăng count_child ở parent comment
                queryClient.setQueryData(queryKeys[0], (oldData: any) => {
                    if (!oldData || !oldData.pages) return oldData;
                    const newPages = oldData.pages.map((page: any) => ({
                        ...page,
                        comments: page.comments.map((comment: any) => (comment._id === resComment.parent_id ? { ...comment, count_child: (comment.count_child || 0) + 1 } : comment)),
                    }));
                    return { ...oldData, pages: newPages };
                });

                // Add reply
                queryClient.setQueryData(queryKeys[1], updateFn);
            } else {
                // Add top-level comment
                queryClient.setQueryData(queryKeys[0], updateFn);
            }

            onSuccess?.();
        },
    });

    return { postComment };
};

export const useMutationPatchComment = (sort_comment: EMovieSort) => {
    const queryClient = useQueryClient();

    const { mutate: patchComment } = useMutation({
        mutationFn: CommentService.patchComment,
        onError: (error) => {
            console.error('Error updating comment:', error);
        },
        onSuccess: (data) => {
            const resComment = data.comment;

            const queryKey = resComment.parent_id ? ['comments', 'child', resComment.parent_id, sort_comment] : ['comments', 'episode', resComment.episode_id, sort_comment];

            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData || !oldData.pages) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        comments: page.comments.map((comment: any) => (comment._id === resComment._id ? { ...comment, text: resComment.text } : comment)),
                    })),
                };
            });
        },
    });

    return { patchComment };
};

export const useMutationDeleteComment = (payload: { _id: string; parent_id?: string }, queryKeys: any[]) => {
    const queryClient = useQueryClient();

    const { mutate: deleteComment } = useMutation({
        mutationFn: CommentService.deleteComment,
        onError: (error) => {
            console.error('Error deleting comment:', error);
        },
        onSuccess: () => {
            const updatePages = (pages: any[]) =>
                pages
                    .map((page) => ({
                        ...page,
                        comments: page.comments.filter((c: any) => c._id !== payload._id),
                    }))
                    .filter((page) => page.comments.length > 0);

            if (payload._id !== payload.parent_id) {
                queryClient.setQueryData(queryKeys[0], (oldData: any) => {
                    if (!oldData || !oldData.pages) return oldData;
                    const updatedPages = oldData.pages.map((page: any) => ({
                        ...page,
                        comments: page.comments.map((comment: any) => (comment._id === payload.parent_id ? { ...comment, count_child: Math.max((comment.count_child || 1) - 1, 0) } : comment)),
                    }));
                    return { ...oldData, pages: updatedPages };
                });

                queryClient.setQueryData(queryKeys[1], (oldData: any) => {
                    if (!oldData || !oldData.pages) return oldData;
                    return { ...oldData, pages: updatePages(oldData.pages) };
                });
            } else {
                queryClient.setQueryData(queryKeys[0], (oldData: any) => {
                    if (!oldData || !oldData.pages) return oldData;
                    return { ...oldData, pages: updatePages(oldData.pages) };
                });
            }
        },
    });

    return { deleteComment };
};
