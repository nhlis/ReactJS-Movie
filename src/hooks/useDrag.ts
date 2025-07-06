import { useRef } from 'react';

export const useDrag = ({ onDrag, onDragEnd, sensitivity = 1 }: { onDrag: (velocity: number) => void; onDragEnd: (velocity: number) => void; sensitivity?: number }) => {
    const dragState = useRef({
        lastX: 0,
        velocity: 0,
        lastTime: 0,
        isDragging: false,
    });

    const handleDragStart = (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
        e.preventDefault();
        const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        dragState.current = {
            lastX: startX,
            velocity: 0,
            lastTime: Date.now(),
            isDragging: true,
        };
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
        e.preventDefault();
        if (!dragState.current.isDragging) return;

        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const now = Date.now();
        const deltaX = (currentX - dragState.current.lastX) * sensitivity;
        const deltaTime = now - dragState.current.lastTime;

        // Tính velocity trực tiếp (tốc độ thay đổi theo thời gian)
        let velocity = 0;
        if (deltaTime > 0) {
            velocity = deltaX / deltaTime;
        }

        dragState.current.velocity = velocity;
        dragState.current.lastX = currentX;
        dragState.current.lastTime = now;

        // Gọi callback với velocity liên tục
        onDrag(velocity);
    };

    const handleDragEnd = () => {
        if (dragState.current.isDragging) {
            onDragEnd(dragState.current.velocity);
        }
        dragState.current.isDragging = false;
    };

    return {
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    };
};
