import { useEffect } from 'react';

const usePreventScroll = (isActive: boolean, scrollableSelector?: string) => {
    useEffect(() => {
        const preventScroll = (e: Event) => {
            if (scrollableSelector && (e.target as HTMLElement).closest(scrollableSelector)) {
                return;
            }
            e.preventDefault();
        };

        if (isActive) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('wheel', preventScroll, { passive: false });
        } else {
            document.body.style.overflow = '';
            document.removeEventListener('wheel', preventScroll);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('wheel', preventScroll);
        };
    }, [isActive, scrollableSelector]);
};

export default usePreventScroll;
