import { useState, useEffect, useRef } from 'react';

export const useAutoSlide = ({ interval, onNext }: { interval: number; onNext: () => void }) => {
    const [remainingTime, setRemainingTime] = useState(interval);
    const [isRunning, setIsRunning] = useState(true);
    const timeoutRef = useRef<any | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        let flagAutoNext = false;

        if (!isRunning) return;

        const timeoutDuration = remainingTime;
        startTimeRef.current = Date.now();

        timeoutRef.current = setTimeout(() => {
            onNext();
            setRemainingTime(interval);
            flagAutoNext = true;
        }, timeoutDuration);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                if (startTimeRef.current && !flagAutoNext) {
                    const elapsed = Date.now() - startTimeRef.current;
                    setRemainingTime((prev) => Math.max(0, prev - elapsed));
                }
            }
        };
    }, [isRunning, onNext]);

    const pause = () => setIsRunning(false);

    const resume = () => setIsRunning(true);

    const resetTimer = () => setRemainingTime(interval);

    return { pause, resume, resetTimer, isRunning };
};
