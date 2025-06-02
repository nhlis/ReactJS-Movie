import { EMovieGenre, EMovieType } from '../enums';
import { EMovieLanguage } from '../enums/movie/language.movie.enum';

export interface IOverviewResponse {
    _id: string;
    original_title: string;
    alternative_titles: string;
    description: string;
    genres: EMovieGenre[];
    type: EMovieType;
    release_date: Date;
    subtitle_languages: EMovieLanguage[];
    dub_languages: EMovieLanguage[];
    logo: string;
    poster: string;
    backdrop: string;
    age_rating: number;
    total_rating: number;
    count_rating: number;
    average_rating: number;
    count_season: number;
    count_episode: number;
    count_view: number;
    is_bookmark?: boolean;
    rating_point?: number;
    created_at: Date;
    updated_at: Date;
}

export interface Filters {
    language: string;
    media: string;
}
