import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Simulcast.module.scss';
import { useNavigate, useParams } from 'react-router';
import { EColor, ESeason, ESize } from '../../enums';
import { PCard } from '../../components/PCard/PCard';
import { GirdCard } from '../../components/GirdCard/GirdCard';
import { getSeasonsFromYear } from '../../utils/get-seasons-from-year';
import usePreventScroll from '../../hooks/usePreventScroll';
import { BiCaretDown } from 'react-icons/bi';
import { slugToString, stringToSlug } from '../../utils/handle-slug';
import { MdSort } from 'react-icons/md';
import { routes } from '../../configs';
import { useClickOutside } from '../../hooks/useClickOutside';
import BrowseDropdown from '../../components/BrowserDropdown/BrowserDropdown';
import { getDateFromSeason } from '../../utils/get-date-from-season';
import { IOverviewResponse } from '../../interfaces/overview.interface';
import { useSimulcastSesson } from '../../hooks/useQueryOverviews';

const cx = classNames.bind(styles);

function Simulcast() {
    const { season } = useParams<{ season: string }>();
    const arrSeason = useMemo(() => getSeasonsFromYear(2000), []);

    const navigate = useNavigate();

    const [seasonStr, yearStr] = season ? slugToString(season).split(' ') : ['', ''];

    const { start, end } = getDateFromSeason(seasonStr as ESeason, Number(yearStr));

    const browseRef = useRef<HTMLButtonElement>(null);
    const seasonRef = useRef<HTMLButtonElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const [isSeasonActive, setIsSeasonActive] = useState<boolean>(false);
    const [isBrowseActive, setIsBrowseActive] = useState<boolean>(false);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useSimulcastSesson(start, end);

    useClickOutside([browseRef, seasonRef], () => {
        setIsBrowseActive(false);
        setIsSeasonActive(false);
    });

    useEffect(() => {
        if (!season) navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = 'A Project: Watch Popular Anime';
    }, [season, navigate]);

    usePreventScroll(isSeasonActive, `.${cx('simulcastContainer__header__actions__dropdown__scrollable')}`);

    // Infinite scroll observer
    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const overviews = useMemo(() => {
        return (
            data?.pages
                .flatMap((page) => page.overviews) // Extract histories array from each page
                .filter((h): h is IOverviewResponse => h !== undefined) || [] // Ensure non-undefined items
        );
    }, [data]);

    if (isError) return <div className={cx('status')}>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;

    return (
        <div className={cx('simulcastWrapper')}>
            <div className={cx('simulcastContainer')}>
                <header className={cx('simulcastContainer__header')}>
                    <div className={cx('simulcastContainer__header__title')}>
                        <h3>Simulcast Season</h3>
                    </div>
                    <div className={cx('simulcastContainer__header__actions')}>
                        <button
                            ref={browseRef}
                            className={cx('simulcastContainer__header__actions__btn', { active: isBrowseActive })}
                            onClick={() => {
                                setIsBrowseActive(!isBrowseActive);
                                setIsSeasonActive(false);
                            }}
                        >
                            <MdSort size={ESize.ICON} color={EColor.GREY_COLOR} />
                            <span className={cx('simulcastContainer__header__actions__btn__title')}>Simulcast</span>
                            <BrowseDropdown isActive={isBrowseActive} />
                        </button>
                        <button
                            ref={seasonRef}
                            className={cx('simulcastContainer__header__actions__btn', { active: isSeasonActive })}
                            onClick={() => {
                                setIsBrowseActive(false);
                                setIsSeasonActive(!isSeasonActive);
                            }}
                        >
                            <BiCaretDown size={ESize.ICON} color={EColor.GREY_COLOR} />
                            <span className={cx('simulcastContainer__header__actions__btn__title')}>{season ? slugToString(season) : 'Unknown Season'}</span>
                            <div className={cx('simulcastContainer__header__actions__dropdown')}>
                                <div className={cx('simulcastContainer__header__actions__dropdown__scrollable')}>
                                    {arrSeason.map((item) => (
                                        <div
                                            key={item.year + item.season}
                                            className={cx('simulcastContainer__header__actions__dropdown__item', {
                                                active: season && slugToString(season) === `${item.season} ${item.year}` ? true : false,
                                            })}
                                            onClick={() => {
                                                navigate(routes.simulcastURL(stringToSlug(item.season + '-' + item.year)));
                                            }}
                                        >
                                            {item.season}&nbsp;{item.year}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </button>
                    </div>
                </header>

                {isLoading ? (
                    <>
                        <div className={cx('status')}>Loading...</div>
                    </>
                ) : (
                    <>
                        <GirdCard>
                            {overviews.map((card: IOverviewResponse) => (
                                <div key={card._id} className={cx('heroCard__slide')}>
                                    <PCard
                                        _id={card._id}
                                        original_title={card.original_title}
                                        description={card.description}
                                        subtitle_languages={card.subtitle_languages}
                                        dub_languages={card.dub_languages}
                                        type={card.type}
                                        poster={card.poster}
                                        backdrop={card.backdrop}
                                        average_rating={card.average_rating}
                                        is_bookmark={card.is_bookmark ?? false}
                                        count_episode={card.count_episode}
                                        count_season={card.count_season}
                                        count_rating={card.count_rating}
                                    />
                                </div>
                            ))}
                        </GirdCard>

                        {/* Infinite Load Trigger */}
                        {hasNextPage && !isFetchingNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default Simulcast;
