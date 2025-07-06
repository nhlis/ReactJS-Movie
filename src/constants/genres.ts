import { EMovieGenre } from '../enums';

export const genres: Record<EMovieGenre, { img: string; description: string }> = {
    [EMovieGenre.ACTION]: {
        img: '1J59hMuuBvnqzm7vLMpigKx_G51cyiEJq',
        description: 'For all your fist flying and huge explosion needs!',
    },
    [EMovieGenre.MUSIC]: {
        img: '1QNk3djuIVDci5QPq2_ouq0d9IiC-LlWC',
        description: 'From classical to rock and everything in between, these shows are ready to perform!',
    },
    [EMovieGenre.SHOUNEN]: {
        img: '1SF0pr_JOaWlxkAXfdoyz3DyScpQJYFge',
        description: 'Teamwork, the power of friendship, and achieving your dreams: The fundamentals are all here!',
    },
    [EMovieGenre.ADVENTURE]: {
        img: '1kNLNR1mOEWYJQEI065QF7A4XzdO9F9H7',
        description: 'Venture forth with heroes who hope to achieve their dreams!',
    },
    [EMovieGenre.ROMANCE]: {
        img: '1vKubjp8z0lrprFZZ4iyEguMBI29CvH04',
        description: 'Want your heart to flutter and believe in love after love? This is for you romantics out there.',
    },
    [EMovieGenre.SLICE_OF_LIFE]: {
        img: '1DAC9Z14W7ZqcztP8qRg-IqVMx9LX9YsJ',
        description: "Slow and steady? That's exactly my kind of vibe.",
    },
    [EMovieGenre.COMEDY]: {
        img: '1e0fomUR_2wGxKheDU80cVmEZ085lftQU',
        description: 'Find lots of laughs from classic slapstick to the in-too-deep cult classics.',
    },
    [EMovieGenre.SCIENCE_FICTION]: {
        img: '1u6C1HBXZ8_mUZIr90RXgd7vJ-8Egbm4p',
        description: 'Get ready to launch and hack into the grid with these high-tech series.',
    },
    [EMovieGenre.SPORTS]: {
        img: '1oddtZ3riYuHYB2ht7oMPzxOs7O8vTPoF',
        description: 'Ball (and other forms of physical activity) is life!',
    },
    [EMovieGenre.DRAMA]: {
        img: '1Vg22A2VVVCl7-DaDdPBgXM9yT_y56tQD',
        description: 'A perfect selection of dramatic stories to stir emotions!',
    },
    [EMovieGenre.SEINEN]: {
        img: '1Ffp-o7PP6_43Pyz0pi3s6VCkFb9vOxBA',
        description: "When you're feeling a little more adult, these might suit your tastes.",
    },
    [EMovieGenre.SUPERNATURAL]: {
        img: '1LskOlZGRJXQSKLobHI8ltFPIMEJ12NF3',
        description: 'Ghouls, Ghosts, Goblins, and many more creatures abound!',
    },
    [EMovieGenre.FANTASY]: {
        img: '1oMuWExbird29u-VosU0EmclqLxmsc052',
        description: "It's time to get deep and act one more time... with feeling!",
    },
    [EMovieGenre.SHOUJO]: {
        img: '1WKDMbO5LWClWqQNvQPkGpG2Bsq8W_jEf',
        description: 'The springtime of youth, that look you give your first crush, and that extra sense of fashion. These girls have it all.',
    },
    [EMovieGenre.THRILLER]: {
        img: '1YCUpi5gP-3lszrdYqfOzfQ1UrOq6f_C4',
        description: 'A perfect selection of shows to feel that tingle down your spine and scream at the screen "Don\'t go that way!"',
    },
};
