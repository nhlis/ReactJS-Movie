import { ESeason, SEASONS } from '@/enums';

export const getSeasonsFromYear = (startYear: number) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const result: { season: ESeason; year: number }[] = [];

    for (let year = startYear; year <= currentYear; year++) {
        for (const { name, start, end } of SEASONS) {
            let seasonYear = year;

            // Nếu mùa kết thúc vào năm sau (mùa Đông), cần giảm year
            if (end.month < start.month) {
                seasonYear = year - 1;
            }

            // 🛑 Nếu seasonYear nhỏ hơn startYear, bỏ qua
            if (seasonYear < startYear) continue;

            const seasonStartDate = new Date(seasonYear, start.month - 1, start.day);

            if (seasonYear < currentYear || seasonStartDate <= currentDate) {
                result.push({ season: name, year: seasonYear });
            }
        }
    }

    return result.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return SEASONS.findIndex((s) => s.name === b.season) - SEASONS.findIndex((s) => s.name === a.season);
    });
};
