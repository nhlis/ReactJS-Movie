import { ESeason, SEASONS } from '@/enums';

export const getSeason = (): { name: ESeason; year: number } => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    let year = today.getFullYear();

    for (const season of SEASONS) {
        const { start, end, name } = season;

        if ((month > start.month || (month === start.month && day >= start.day)) && (month < end.month || (month === end.month && day <= end.day))) {
            return { name, year };
        }
    }
    return { name: ESeason.Winter, year: month >= 12 ? year : year - 1 };
};
