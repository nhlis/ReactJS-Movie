import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const useMutationReaction = (isReaction: boolean, entity_id: string, postApiCall: (payload: any) => Promise<any>, deleteApiCall: (payload: any) => Promise<any>, queryKeys: string[]) => {
    const [localReaction, setLocalReaction] = useState(isReaction);
    const queryClient = useQueryClient();

    // API call for liking
    const { mutate: postReaction } = useMutation({
        mutationFn: postApiCall,
        onError: () => {
            setLocalReaction((prev) => !prev); // Undo the state change on error
        },
        onSettled: () => {
            // Invalidate the passed query keys
            queryKeys.forEach((queryKey) => {
                queryClient.invalidateQueries({ queryKey: [queryKey] }); // Đảm bảo rằng queryKey là mảng
            });

            // Invalidate queries related to overviews specifically
            const queries = queryClient.getQueryCache().getAll();
            queries.forEach((query) => {
                const queryData = queryClient.getQueryData(query.queryKey);
                if (Array.isArray(queryData)) {
                    const dataContainsOverviewId = queryData.some((item: any) => item._id === entity_id);
                    if (dataContainsOverviewId) {
                        queryClient.invalidateQueries({ queryKey: query.queryKey });
                    }
                }
            });
        },
    });

    // API call for unliking
    const { mutate: deleteReaction } = useMutation({
        mutationFn: deleteApiCall,
        onError: () => {
            setLocalReaction((prev) => !prev); // Undo the state change on error
        },
        onSettled: () => {
            // Invalidate the passed query keys
            queryKeys.forEach((queryKey) => {
                queryClient.invalidateQueries({ queryKey: [queryKey] }); // Đảm bảo rằng queryKey là mảng
            });

            // Invalidate queries related to overviews specifically
            const queries = queryClient.getQueryCache().getAll();
            queries.forEach((query) => {
                const queryData = queryClient.getQueryData(query.queryKey);
                if (Array.isArray(queryData)) {
                    const dataContainsOverviewId = queryData.some((item: any) => item._id === entity_id);
                    if (dataContainsOverviewId) {
                        queryClient.invalidateQueries({ queryKey: query.queryKey });
                    }
                }
            });
        },
    });

    const handleReactionClick = () => {
        const newState = !localReaction;
        setLocalReaction(newState);

        if (newState) {
            postReaction({ entity_id });
        } else {
            deleteReaction({ entity_id });
        }
    };

    useEffect(() => {
        setLocalReaction(isReaction); // Set initial state when `isLiked` prop changes
    }, [isReaction]);

    return {
        localReaction,
        handleReactionClick,
    };
};

export default useMutationReaction;
