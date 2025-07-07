import { ESeason, SEASONS } from '@/enums';

export const getDateFromSeason = (season: ESeason, year: number) => {
    const seasonData = SEASONS.find((s) => s.name === season);
    if (!seasonData) throw new Error('Invalid season');

    const { start, end } = seasonData;

    const startDate = new Date(Date.UTC(year, start.month, start.day));
    let endDate = new Date(Date.UTC(year, end.month, end.day));

    // Nếu là mùa Đông thì endDate sẽ thuộc năm sau
    if (season === ESeason.Winter) {
        endDate = new Date(Date.UTC(year + 1, end.month, end.day));
    }

    return { start: startDate, end: endDate };
};
