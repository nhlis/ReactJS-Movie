// src/hooks/useFilters.ts
import { useState } from 'react';

export const useFilters = <T extends Record<string, any>>(initialFilters: T) => {
    const [filters, setFilters] = useState<T>(initialFilters);

    const updateFilter = <K extends keyof T>(key: K, value: T[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    return { filters, updateFilter, resetFilters };
};
