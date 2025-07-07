import { EMovieGenre } from '@/enums';

export const genres: Record<EMovieGenre, { img: string; description: string }> = {
    [EMovieGenre.ACTION]: {
        img: '/genres/action.png',
        description: 'For all your fist flying and huge explosion needs!',
    },
    [EMovieGenre.MUSIC]: {
        img: '/genres/music.png',
        description: 'From classical to rock and everything in between, these shows are ready to perform!',
    },
    [EMovieGenre.SHOUNEN]: {
        img: '/genres/shonen.png',
        description: 'Teamwork, the power of friendship, and achieving your dreams: The fundamentals are all here!',
    },
    [EMovieGenre.ADVENTURE]: {
        img: '/genres/adventure.png',
        description: 'Venture forth with heroes who hope to achieve their dreams!',
    },
    [EMovieGenre.ROMANCE]: {
        img: '/genres/romance.png',
        description: 'Want your heart to flutter and believe in love after love? This is for you romantics out there.',
    },
    [EMovieGenre.SLICE_OF_LIFE]: {
        img: '/genres/slice_of_life.png',
        description: "Slow and steady? That's exactly my kind of vibe.",
    },
    [EMovieGenre.COMEDY]: {
        img: '/genres/comedy.png',
        description: 'Find lots of laughs from classic slapstick to the in-too-deep cult classics.',
    },
    [EMovieGenre.SCIENCE_FICTION]: {
        img: '/genres/sciene_fiction.png',
        description: 'Get ready to launch and hack into the grid with these high-tech series.',
    },
    [EMovieGenre.SPORTS]: {
        img: '/genres/sports.png',
        description: 'Ball (and other forms of physical activity) is life!',
    },
    [EMovieGenre.DRAMA]: {
        img: '/genres/drama.png',
        description: 'A perfect selection of dramatic stories to stir emotions!',
    },
    [EMovieGenre.SEINEN]: {
        img: '/genres/seinen.png',
        description: "When you're feeling a little more adult, these might suit your tastes.",
    },
    [EMovieGenre.SUPERNATURAL]: {
        img: '/genres/supernatural.png',
        description: 'Ghouls, Ghosts, Goblins, and many more creatures abound!',
    },
    [EMovieGenre.FANTASY]: {
        img: '/genres/fantasy.png',
        description: "It's time to get deep and act one more time... with feeling!",
    },
    [EMovieGenre.SHOUJO]: {
        img: '/genres/shojo.png',
        description: 'The springtime of youth, that look you give your first crush, and that extra sense of fashion. These girls have it all.',
    },
    [EMovieGenre.THRILLER]: {
        img: '/genres/thriller.png',
        description: 'A perfect selection of shows to feel that tingle down your spine and scream at the screen "Don\'t go that way!"',
    },
};
