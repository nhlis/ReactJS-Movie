import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkService } from '../services/bookmark.service';
import { useState, useEffect } from 'react';

const useMutationBookmark = (is_bookmark: boolean, _id: string) => {
    const [localBookmark, setLocalBookmark] = useState(is_bookmark);
    const queryClient = useQueryClient();

    const { mutate: postBookmark } = useMutation({
        mutationFn: BookmarkService.postBookmark,
        onError: () => {
            setLocalBookmark((prev) => !prev);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['overviews'] });
        },
    });

    const { mutate: deleteBookmark } = useMutation({
        mutationFn: BookmarkService.deleteBookmark,
        onError: () => {
            setLocalBookmark((prev) => !prev);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['overviews'] });
        },
    });

    const handleBookmarkClick = () => {
        const newState = !localBookmark;
        setLocalBookmark(newState);
        if (newState) {
            postBookmark({ overview_id: _id });
        } else {
            deleteBookmark({ overview_id: _id });
        }
    };

    useEffect(() => {
        setLocalBookmark(is_bookmark);
    }, [is_bookmark]);

    return {
        localBookmark,
        handleBookmarkClick,
    };
};

export default useMutationBookmark;
