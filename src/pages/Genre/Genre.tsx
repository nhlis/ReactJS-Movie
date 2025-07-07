import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/pages/Genre/Genre.module.scss';
import { EMovieGenre } from '@/enums';
import { useParams } from 'react-router';
import { slugToEnum, slugToString } from '@/utils/handle-slug';
import { ListHeroCard } from '@/components/ListHeroCard/ListHeroCard';
import { data } from '@/constants';
import { OverviewService } from '@/services/overview.service';
import { useQueries } from '@tanstack/react-query';

const cx = classNames.bind(styles);

function Genre() {
    const { genres } = useParams<{ genres: EMovieGenre }>();

    if (!genres || !(genres in data.genres)) return <div>Genre not found!</div>;

    const results = useQueries({
        queries: [
            { queryKey: ['overviews', 'genres', 'popular', genres], queryFn: () => OverviewService.getOverviewsByGenres(20, [slugToEnum(genres) as EMovieGenre], 'popular') },
            { queryKey: ['overviews', 'genres', 'new', genres], queryFn: () => OverviewService.getOverviewsByGenres(20, [slugToEnum(genres) as EMovieGenre], 'new') },
        ],
    });

    const overviewsGenreByPopular = results[0]?.data?.overviews;
    const overviewsGenreByNew = results[1]?.data?.overviews;

    const isLoading = results.some((result) => result.isLoading);
    const isError = results.some((result) => result.error);

    const title = slugToString(genres);

    const { img, description } = data.genres[genres as EMovieGenre];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = `${title} Anime shows and Movies - A Project`;
    }, [genres]);

    if (isError) {
        return <div className={cx('error')}>Something went wrong!</div>;
    }

    return (
        <div className={cx('genreWrapper')}>
            <div className={cx('genreContainer')}>
                <div className={cx('genreContainer__header')}>
                    <h2 className={cx('genreContainer__header__title')}>
                        <img className={cx('genreContainer__header__img')} src={img} loading="lazy" />
                        {genres ? title : genres}
                    </h2>
                    <p className={cx('genreContainer__header__description')}>{description}</p>
                </div>
            </div>
            {isLoading ? (
                <>
                    <div className={cx('loading')}>Loading...</div>
                </>
            ) : (
                <>
                    <div className={cx('genreWrapper__body')}>
                        {overviewsGenreByPopular && overviewsGenreByPopular.length > 0 && (
                            <div className={cx('listMovie')}>
                                <ListHeroCard title={'Popular'} cards={overviewsGenreByPopular} />
                            </div>
                        )}
                        {overviewsGenreByNew && overviewsGenreByNew.length > 0 && (
                            <div className={cx('listMovie')}>
                                <ListHeroCard title={'New'} cards={overviewsGenreByNew} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Genre;
