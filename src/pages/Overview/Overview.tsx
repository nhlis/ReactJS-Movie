import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Overview.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { MdSort } from 'react-icons/md';
import { BiCaretDown } from 'react-icons/bi';

import { Slide } from '../../components/Slide/Slide';
import { ListHeroCard } from '../components/ListHeroCard/ListHeroCard';

import { OverviewService } from '../../services/overview.service';
import { SeasonService } from '../../services/season.service';
import { EpisodeService } from '../../services/episode.service';
import { slugToString } from '../../utils/handle-slug';
import { EColor, EMovieGenre, EMovieSort, ESize } from '../../enums';
import { ISeason } from '../../interfaces/season.interface';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFilters } from '../../hooks/useFilters';
import { IEpisodeResponse } from '../../interfaces/episode.interface';
import { IOverviewResponse } from '../../interfaces/overview.interface';
import { Button } from '../../components/Button/Button';
import ECard from '../../components/ECard/ECard';

const cx = classNames.bind(styles);

function Overview() {
    const { overviewWithId } = useParams<{ overviewWithId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!overviewWithId) navigate(-1);
    }, [overviewWithId, navigate]);

    const [, overview_id] = overviewWithId!.split(/-(?=\d+$)/);

    const browseRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLButtonElement>(null);

    const [season, setSeason] = useState<ISeason | undefined>(undefined);
    const [isBrowseActive, setIsBrowseActive] = useState<boolean>(false);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

    const { filters, updateFilter } = useFilters<{ sort: EMovieSort }>({ sort: EMovieSort.DESC });

    useClickOutside([browseRef, filterRef], () => {
        setIsBrowseActive(false);
        setIsFilterActive(false);
    });

    // Fetch overview data
    const { data: dataOverviews, isLoading: isLoadingOverview } = useQuery({
        queryKey: ['overview', overview_id],
        queryFn: () => OverviewService.getOverviewsByIds([overview_id!]),
        enabled: !!overview_id,
    });

    const overview = dataOverviews?.overviews?.[0];

    // Fetch related content by genre
    const { data: dataOverviewsByGenres, isLoading: isLoadingOverviewGenres } = useQuery({
        queryKey: ['overviews', 'genres', 'popular', overview?.genres],
        queryFn: () => OverviewService.getOverviewsByGenres(20, overview?.genres as EMovieGenre[], 'popular'),
        enabled: !!overview?.genres,
    });

    // Fetch seasons data
    const { data: dataSeasons, isLoading: isLoadingSeasons } = useQuery({
        queryKey: ['seasons', overview_id],
        queryFn: () => SeasonService.getSeasonsByOverview(overview_id!),
        enabled: !!overview_id,
    });

    // Set default season when seasons data is loaded
    useEffect(() => {
        // Nếu có season thì lấy season đầu tiên, nếu không thì reset về undefined
        setSeason(dataSeasons?.seasons?.[0] || undefined);
    }, [dataSeasons?.seasons]);

    // Fetch episodes with pagination
    const {
        data: dataEpisodes,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingEpisodes,
    } = useInfiniteQuery({
        queryKey: ['episodes', 'infinite', season?._id, filters.sort],
        queryFn: async ({ pageParam = null }: { pageParam?: string | null }) => {
            const res = await EpisodeService.getEpisodesBySeason(season?._id!, 24, pageParam || undefined, filters.sort);
            return res;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.hasMore) {
                return lastPage.episodes[lastPage.episodes.length - 1]?._id;
            }
            return undefined;
        },
        initialPageParam: null as string | null, // Explicitly type initialPageParam
        enabled: !!season?._id,
    });

    // Sort episodes based on filters
    const sortedEpisodes = useMemo(() => {
        const episodes =
            dataEpisodes?.pages
                .flatMap((page) => page.episodes) // Extract overviews array from each page
                .filter((overview): overview is IEpisodeResponse => overview !== undefined) || [];

        return episodes.sort((a: any, b: any) => {
            const dateA = new Date(a.release_date).getTime();
            const dateB = new Date(b.release_date).getTime();

            return filters.sort === EMovieSort.ASC ? dateA - dateB : dateB - dateA;
        });
    }, [dataEpisodes?.pages, filters.sort]);

    // Combined loading state
    const isLoading = isLoadingOverview || isLoadingOverviewGenres || isLoadingSeasons || isLoadingEpisodes;

    // No content fallback
    if (!overview) return <div className={cx('no-content')}>No content available</div>;

    return (
        <div className={cx('overview')}>
            <div className={cx('overviewWarpper')}>
                {/* Hero Section */}
                <div className={cx('overviewSlide')}>
                    {overview && (
                        <Slide
                            overview={overview}
                            layout="overview"
                            episode_id={sortedEpisodes[0]?._id}
                            episode_number={sortedEpisodes[0]?.episode_number}
                            type={overview.type}
                            episode_title={sortedEpisodes[0]?.title}
                        />
                    )}
                </div>

                {/* Details Section */}
                {overview && (
                    <div className={cx('overview__details__container')}>
                        <div className={cx('overview__details__description')}>
                            <span>{overview.description}</span>
                        </div>

                        <div className={cx('overview__details__content')}>
                            <div className={cx('overview__details__content__audio')}>
                                <strong>Audio:</strong>&nbsp;
                                {overview.dub_languages && overview.dub_languages.length > 0 ? (
                                    <span className={cx('italic')}>{overview.dub_languages.map((dub) => dub.charAt(0).toUpperCase() + dub.slice(1)).join(', ')}</span>
                                ) : (
                                    <span className={cx('italic')}>Raw</span>
                                )}
                            </div>

                            <div className={cx('overview__details__content__subtitles')}>
                                <strong>Subtitles:</strong>&nbsp;
                                {overview.subtitle_languages && overview.subtitle_languages.length > 0 ? (
                                    <span className={cx('italic')}>{overview.subtitle_languages.map((sub) => sub.charAt(0).toUpperCase() + sub.slice(1)).join(', ')}</span>
                                ) : (
                                    <span className={cx('italic')}>None</span>
                                )}
                            </div>

                            <div className={cx('overview__details__content__advisory')}>
                                <strong>Content Advisory:</strong>&nbsp;
                                <span className={cx('italic')}>{overview.age_rating}+</span>
                            </div>

                            <div className={cx('overview__details__content__genres')}>
                                <strong>Genres:</strong>&nbsp;
                                {overview.genres &&
                                    overview.genres.map((gen, index, arr) => (
                                        <span key={index} className={cx('italic')}>
                                            {slugToString(gen)}
                                            {index !== arr.length - 1 && ', '}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Episodes Section */}
                <div className={cx('overview__episodes__container')}>
                    {/* Season Browser */}
                    <div className={cx('overview__episodes__container__browser')}>
                        <div className={cx('overview__episodes__container__browser__season__select')}>
                            {dataSeasons?.seasons && season && dataSeasons.seasons.length > 0 && overview && (
                                <div ref={browseRef}>
                                    {dataSeasons.seasons.length > 1 ? (
                                        <div>
                                            <div
                                                className={cx('overview__episodes__container__browser__season__select__header')}
                                                onClick={() => {
                                                    setIsBrowseActive(!isBrowseActive);
                                                    setIsFilterActive(false);
                                                }}
                                            >
                                                <span className={cx('overview__episodes__container__browser__season__icon')}>
                                                    <BiCaretDown size={ESize.ICON - 5} />
                                                </span>
                                                <h3 className={cx('overview__episodes__container__browser__season__title')}>
                                                    <span>
                                                        {season.name}:{'\u00A0'}
                                                    </span>
                                                    <span>{overview.original_title}</span>
                                                </h3>
                                            </div>
                                            <div className={cx('overview__episodes__container__browser__season__select__body')}>
                                                <ul className={cx('overview__episodes__container__browser__season__dropdown', { active: isBrowseActive })}>
                                                    {dataSeasons.seasons.map((s, index) => (
                                                        <li
                                                            key={s._id ?? index}
                                                            className={cx('overview__episodes__container__browser__season__dropdown__item', {
                                                                active: s._id === season._id,
                                                            })}
                                                            onClick={() => {
                                                                setSeason(s);
                                                                setIsBrowseActive(false);
                                                            }}
                                                        >
                                                            <div>
                                                                <span>
                                                                    {s.name}:{'\u00A0'}
                                                                </span>
                                                                <span>{overview.original_title}</span>
                                                            </div>
                                                            <div>
                                                                <span>
                                                                    {s.count_episode}
                                                                    {'\u00A0'}Episodes
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={cx('overview__episodes__container__browser__season__select__header')}>
                                            <h3 className={cx('overview__episodes__container__browser__season__title')}>
                                                <span>{overview.original_title}</span>
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Filter Options */}
                        {sortedEpisodes && sortedEpisodes.length > 0 && (
                            <div className={cx('overview__episodes__container__browser__actions')}>
                                <button
                                    ref={filterRef}
                                    className={cx('overview__episodes__container__browser__actions__btn', { active: isFilterActive })}
                                    onClick={() => {
                                        setIsBrowseActive(false);
                                        setIsFilterActive(!isFilterActive);
                                    }}
                                >
                                    <MdSort size={ESize.ICON} color={EColor.GREY_COLOR} />
                                    <span className={cx('overview__episodes__container__browser__actions__btn__title')}>Sort by</span>
                                    <div className={cx('overview__episodes__container__browser__actions__dropdown', { active: isFilterActive })}>
                                        <div className={cx('overview__episodes__container__browser__actions__dropdown__scrollable')}>
                                            <div
                                                className={cx('overview__episodes__container__browser__actions__dropdown__item', {
                                                    active: filters.sort === EMovieSort.DESC,
                                                })}
                                                onClick={() => updateFilter('sort', EMovieSort.DESC)}
                                            >
                                                Newest
                                            </div>
                                            <div
                                                className={cx('overview__episodes__container__browser__actions__dropdown__item', {
                                                    active: filters.sort === EMovieSort.ASC,
                                                })}
                                                onClick={() => updateFilter('sort', EMovieSort.ASC)}
                                            >
                                                Oldest
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Episodes Grid */}
                    {isLoading ? (
                        <div className={cx('loading-container')}>Loading episodes...</div>
                    ) : sortedEpisodes && sortedEpisodes.length > 0 ? (
                        <>
                            <div className={cx('overview__episodes__container__contents')}>
                                {sortedEpisodes.map((episode: IEpisodeResponse) => {
                                    return (
                                        <ECard
                                            key={episode._id}
                                            overview_id={overview._id}
                                            overview_title={overview.original_title}
                                            overview_type={overview.type}
                                            _id={episode._id}
                                            title={episode.title}
                                            description={episode.description}
                                            duration={episode.duration}
                                            episode_number={episode.episode_number}
                                            img={episode.img}
                                            premium={episode.premium}
                                            release_date={episode.release_date}
                                        />
                                    );
                                })}
                            </div>

                            {/* Load More Button */}
                            {hasNextPage && (
                                <div className={cx('overview__episodes__container__loadmore')}>
                                    <Button disabled={isFetchingNextPage} className={cx('overview__episodes__container__loadmore__btn')} onClick={() => fetchNextPage()}>
                                        {isFetchingNextPage ? 'Loading more...' : 'Load more episodes'}
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={cx('no-episodes')}>No episodes available</div>
                    )}
                </div>

                {/* Related Content */}
                {dataOverviewsByGenres?.overviews && dataOverviewsByGenres.overviews.length > 0 && (
                    <div className={cx('listMovie')}>
                        <ListHeroCard title="More Like This" cards={dataOverviewsByGenres.overviews.filter((o: IOverviewResponse) => o._id !== overview?._id)} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Overview;
