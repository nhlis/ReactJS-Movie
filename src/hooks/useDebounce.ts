import { useEffect, useState } from 'react';

const useDebounce = (value: any, delay: number): any => {
    const [debouncedValue, setDebouncedValue] = useState<any>(value || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
