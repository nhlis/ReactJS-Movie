export enum ESeason {
    Spring = 'Spring',
    Summer = 'Summer',
    Fall = 'Fall',
    Winter = 'Winter',
}

export const SEASONS = [
    { name: ESeason.Spring, start: { month: 2, day: 4 }, end: { month: 5, day: 4 } }, // Lập Xuân (~4/2) đến Lập Hạ (~4/5)
    { name: ESeason.Summer, start: { month: 5, day: 5 }, end: { month: 8, day: 6 } }, // Lập Hạ (~5/5) đến Lập Thu (~6/8)
    { name: ESeason.Fall, start: { month: 8, day: 7 }, end: { month: 11, day: 6 } }, // Lập Thu (~7/8) đến Lập Đông (~6/11)
    { name: ESeason.Winter, start: { month: 11, day: 7 }, end: { month: 2, day: 3 } }, // Lập Đông (~7/11) đến Lập Xuân (~3/2)
];
