import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { RatingService } from '@/services/rating.service';

const useMutationRating = (payload: { old_rating_point?: number; overview_id: string }) => {
    const [localRating, setLocalRating] = useState(payload.old_rating_point ?? -1); // Khởi tạo với 0 nếu không có giá trị
    const queryClient = useQueryClient();

    const { mutate: postRating } = useMutation({
        mutationFn: RatingService.postRating,
        onMutate: async (newRating) => {
            // Lạc quan cập nhật localRating trước khi gửi request
            setLocalRating(newRating.point);
            return { previousRating: localRating }; // Lưu trạng thái trước đó để rollback nếu lỗi
        },
        onError: (context: any) => {
            // Nếu lỗi, quay lại trạng thái trước đó
            setLocalRating(context?.previousRating ?? payload.old_rating_point ?? -1);
        },
        onSuccess: () => {
            // Invalidate các queries liên quan để làm mới dữ liệu
            invalidateRelatedQueries();
        },
    });

    const { mutate: deleteRating } = useMutation({
        mutationFn: RatingService.deleteRating,
        onMutate: async () => {
            // Lạc quan đặt localRating về 0 trước khi gửi request
            setLocalRating(-1);
            return { previousRating: localRating }; // Lưu trạng thái trước đó
        },
        onError: (context: any) => {
            // Nếu lỗi, quay lại trạng thái trước đó
            setLocalRating(context?.previousRating ?? payload.old_rating_point ?? -1);
        },
        onSuccess: () => {
            // Invalidate các queries liên quan
            invalidateRelatedQueries();
        },
    });

    const invalidateRelatedQueries = () => {
        const queries = queryClient.getQueryCache().getAll();
        queries.forEach((query) => {
            const queryData = queryClient.getQueryData(query.queryKey);
            if (query.queryKey[0] === 'overviews' && Array.isArray(queryData)) {
                const dataContainsOverviewId = queryData.some((item: any) => item._id === payload.overview_id);
                if (dataContainsOverviewId) {
                    queryClient.invalidateQueries({ queryKey: query.queryKey });
                }
            }
        });
    };

    const handleRatingClick = (new_rating_point: number) => {
        if (localRating === new_rating_point) {
            // Nếu nhấn lại vào rating hiện tại, xóa rating
            deleteRating({ overview_id: payload.overview_id });
        } else {
            // Cập nhật rating mới
            postRating({
                overview_id: payload.overview_id,
                point: new_rating_point,
            });
        }
    };

    return {
        localRating,
        handleRatingClick,
    };
};

export default useMutationRating;
