import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HistoryService } from '@/services/history.service';
import useAuthStore from '@/stores/auth.store';

const useMutationHistory = () => {
    const queryClient = useQueryClient();
    const { is_login } = useAuthStore();

    const postMutation = useMutation({
        mutationFn: HistoryService.postHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['histories'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: HistoryService.deleteHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['histories'] });
        },
    });

    const clearMutation = useMutation({
        mutationFn: HistoryService.clearHistories,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['histories'] });
        },
    });

    // Bọc các hàm lại để thêm điều kiện
    const postHistory = (data: any) => {
        if (is_login) postMutation.mutate(data);
    };

    const deleteHistory = (data: any) => {
        if (is_login) deleteMutation.mutate(data);
    };

    const clearHistories = () => {
        if (is_login) clearMutation.mutate();
    };

    return { postHistory, deleteHistory, clearHistories };
};

export default useMutationHistory;
