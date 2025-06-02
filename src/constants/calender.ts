const setCustomTime = (date: Date, hours: number, minutes: number, seconds: number, ms: number): string => {
    date.setHours(hours, minutes, seconds, ms);
    return date.toISOString();
};

export const calendar = [
    {
        original_title: 'DARLING in the FRANXX',
        episode: 1,
        isDub: false,
        premium: true,
        releaseDate: setCustomTime(new Date(Date.now() - 86400000), 15, 30, 0, 0), // Hôm qua 15:30
        backdrop: 'https://image.tmdb.org/t/p/original/1M4gGsbJTeRP5jXLojsdEMX3mBt.jpg',
    },
    {
        original_title: "I'm Getting Married to a Girl I Hate in My Class",
        episode: 2,
        isDub: true,
        premium: true,
        releaseDate: setCustomTime(new Date(), 18, 0, 0, 0), // Hôm nay 18:00
        backdrop: 'https://image.tmdb.org/t/p/original/rn9aAeJQSXRK0FG14bFmQrktQtY.jpg',
    },
    {
        original_title: "I'm Getting Married to a Girl I Hate in My Class",
        episode: 3,
        isDub: true,
        premium: false,
        releaseDate: setCustomTime(new Date(), 18, 30, 0, 0),
        backdrop: 'https://image.tmdb.org/t/p/original/rn9aAeJQSXRK0FG14bFmQrktQtY.jpg',
    },
    {
        original_title: "I May Be a Guild Receptionist, but I'll Solo Any Boss to Clock Out on Time",
        episode: 2,
        isDub: false,
        premium: false,
        releaseDate: setCustomTime(new Date(Date.now() - 2 * 86400000), 10, 0, 0, 0), // 2 ngày trước 10:00
        backdrop: 'https://image.tmdb.org/t/p/original/8Ho5eJGtLelyRfkJBP6Lz7mXFdb.jpg',
    },
    {
        original_title: 'The Quintessential Quintuplets',
        episode: 2,
        isDub: false,
        premium: true,
        releaseDate: setCustomTime(new Date(Date.now() + 86400000), 20, 0, 0, 0), // Ngày mai 20:00
        backdrop: 'https://image.tmdb.org/t/p/original/vSDqmGqmxCMt2drhvBJC5g0apuI.jpg',
    },
    {
        original_title: 'The Quintessential Quintuplets',
        episode: 1,
        isDub: true,
        premium: true,
        releaseDate: setCustomTime(new Date(Date.now() - 86400000), 9, 45, 0, 0), // Hôm qua 9:45
        backdrop: 'https://image.tmdb.org/t/p/original/udVZPpeXEVksTCEmWD4UcIZcRvV.jpg',
    },
    {
        original_title: 'The Apothecary Diaries',
        episode: 2,
        isDub: true,
        premium: false,
        releaseDate: setCustomTime(new Date(Date.now() + 2 * 86400000), 14, 15, 0, 0), // 2 ngày sau 14:15
        backdrop: 'https://image.tmdb.org/t/p/original/uDdut2pbpX8NJsHF7MsCu6ipy4F.jpg',
    },
    {
        original_title: 'My Dress-Up Darling',
        episode: 1,
        isDub: false,
        premium: true,
        releaseDate: setCustomTime(new Date(Date.now() - 86400000), 11, 30, 0, 0), // Hôm qua 11:30
        backdrop: 'https://image.tmdb.org/t/p/original/5EEOXlmdQD0Zd5OAcXVUEE2vSQj.jpg',
    },
    {
        original_title: 'The Apothecary Diaries',
        episode: 1,
        isDub: true,
        premium: true,
        releaseDate: setCustomTime(new Date(Date.now() - 2 * 86400000), 17, 0, 0, 0), // 2 ngày trước 17:00
        backdrop: 'https://image.tmdb.org/t/p/original/uDdut2pbpX8NJsHF7MsCu6ipy4F.jpg',
    },
    {
        original_title: "I May Be a Guild Receptionist, but I'll Solo Any Boss to Clock Out on Time",
        episode: 1,
        isDub: false,
        premium: true,
        releaseDate: setCustomTime(new Date(Date.now() + 86400000), 8, 0, 0, 0), // Ngày mai 08:00
        backdrop: 'https://image.tmdb.org/t/p/original/8Ho5eJGtLelyRfkJBP6Lz7mXFdb.jpg',
    },
    {
        original_title: 'BOCCHI THE ROCK!',
        episode: 1,
        isDub: false,
        premium: false,
        releaseDate: setCustomTime(new Date(Date.now() - 86400000), 13, 45, 0, 0), // Hôm qua 13:45
        backdrop: 'https://image.tmdb.org/t/p/original/riRJGnbb18zVBEXpov8GJKnBczj.jpg',
    },
    {
        original_title: 'BOCCHI THE ROCK!',
        episode: 2,
        isDub: false,
        premium: false,
        releaseDate: setCustomTime(new Date(Date.now() - 86400000), 16, 30, 0, 0), // Hôm qua 16:30
        backdrop: 'https://image.tmdb.org/t/p/original/riRJGnbb18zVBEXpov8GJKnBczj.jpg',
    },
    {
        original_title: "I'm Getting Married to a Girl I Hate in My Class",
        episode: 4,
        isDub: true,
        premium: false,
        releaseDate: setCustomTime(new Date(), 19, 0, 0, 0), // Hôm nay 19:00
        backdrop: 'https://image.tmdb.org/t/p/original/rn9aAeJQSXRK0FG14bFmQrktQtY.jpg',
    },
];
