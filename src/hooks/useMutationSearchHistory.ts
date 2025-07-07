import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SearchService } from '@/services/search.service';

const useMutationSearchHistory = () => {
    const queryClient = useQueryClient();

    const { mutate: postSearchHistory } = useMutation({
        mutationFn: SearchService.postSearchHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['search-histories'] });
        },
    });

    const { mutate: deleteSearchHistories } = useMutation({
        mutationFn: SearchService.deleteSearchHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['search-histories'] });
        },
    });

    return { postSearchHistory, deleteSearchHistories };
};

export default useMutationSearchHistory;
