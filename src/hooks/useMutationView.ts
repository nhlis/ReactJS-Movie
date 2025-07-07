import { useMutation } from '@tanstack/react-query';
import { ViewService } from '@/services/view.service';

const useMutationView = () => {
    const { mutate: postView } = useMutation({
        mutationFn: ViewService.postView,
    });

    return { postView };
};

export default useMutationView;
