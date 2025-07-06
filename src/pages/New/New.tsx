import { useEffect, useRef, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { MdSort } from 'react-icons/md';
import { LuSettings2 } from 'react-icons/lu';

import styles from './New.module.scss';
import { EColor, EMovieType, ESize } from '../../enums';

import { Button } from '../../components/Button/Button';
import { PCard } from '../../components/PCard/PCard';
import { GirdCard } from '../../components/GirdCard/GirdCard';
import { useFilters } from '../../hooks/useFilters';
import { useClickOutside } from '../../hooks/useClickOutside';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import BrowseDropdown from '../../components/BrowserDropdown/BrowserDropdown';
import { Filters, IOverviewResponse } from '../../interfaces/overview.interface';
import { useLastedReleases } from '../../hooks/useQueryOverviews';

const cx = classNames.bind(styles);

// Component chính
function New() {
    const browseRef = useRef<HTMLButtonElement>(null);
    const filterRef = useRef<HTMLButtonElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const [isBrowseActive, setIsBrowseActive] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const { filters, updateFilter, resetFilters } = useFilters<Filters>({
        language: 'all',
        media: 'all',
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useLastedReleases();

    useClickOutside([browseRef, filterRef], () => {
        setIsBrowseActive(false);
        setIsFilterActive(false);
    });

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

    // Cập nhật tiêu đề và scroll lên đầu
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = 'A Project: Watch Popular Anime';
    }, []);

    const filteredOverviews = useMemo(() => {
        const overviews =
            data?.pages
                .flatMap((page) => page.overviews) // Extract overviews array from each page
                .filter((overview): overview is IOverviewResponse => overview !== undefined) || [];

        return overviews
            .filter((overview) => {
                if (filters.language === 'all') return true;
                if (filters.language === 'subtitle') return overview.subtitle_languages.length > 0;
                if (filters.language === 'dub') return overview.dub_languages.length > 0;
                return true;
            })
            .filter((overview) => {
                if (filters.media === 'all') return true;
                if (filters.media === 'series') return overview.type === EMovieType.TV_SERIES;
                if (filters.media === 'movie') return overview.type === EMovieType.MOVIE;
                return true;
            });
    }, [data, filters]);

    if (isError) return <div className={cx('status')}>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;

    return (
        <div className={cx('newWrapper')}>
            <div className={cx('newContainer')}>
                <header className={cx('newContainer__header')}>
                    <div className={cx('newContainer__header__title')}>
                        <h3>Newly Added Anime</h3>
                    </div>
                    <div className={cx('newContainer__header__actions')}>
                        {/* Browse Button */}
                        <button
                            ref={browseRef}
                            className={cx('newContainer__header__actions__btn', {
                                active: isBrowseActive,
                            })}
                            onClick={() => {
                                setIsBrowseActive(!isBrowseActive);
                                setIsFilterActive(false);
                            }}
                        >
                            <MdSort size={ESize.ICON} color={EColor.GREY_COLOR} />
                            <span className={cx('newContainer__header__actions__btn__title')}>Newest</span>
                            <BrowseDropdown isActive={isBrowseActive} />
                        </button>

                        {/* Filter Button */}
                        <button
                            ref={filterRef}
                            className={cx('newContainer__header__actions__btn', {
                                hover: filters.language !== 'all' || filters.media !== 'all',
                                active: isFilterActive,
                            })}
                            onClick={() => {
                                setIsBrowseActive(false);
                                setIsFilterActive(!isFilterActive);
                            }}
                        >
                            <LuSettings2 size={ESize.ICON} color={EColor.GREY_COLOR} />
                            <span className={cx('newContainer__header__actions__btn__title')}>Filter</span>
                            <FilterDropdown isActive={isFilterActive} filters={filters} onFilterChange={updateFilter} />
                        </button>
                    </div>
                </header>

                {/* Reset Filters */}
                {(filters.language !== 'all' || filters.media !== 'all') && (
                    <div className={cx('newContainer__filter')}>
                        <Button contentStart onClick={resetFilters}>
                            <div className={cx('newContainer__filter__btn')}>
                                <h4 className={cx('newContainer__filter__btn__title')}>Reset Filters:</h4>
                                <span className={cx('newContainer__filter__btn__title')}>{filters.language}</span>
                                <span className={cx('newContainer__filter__btn__title')}>{filters.media}</span>
                            </div>
                        </Button>
                    </div>
                )}

                {isLoading ? (
                    <>
                        <div className={cx('status')}>Loading...</div>
                    </>
                ) : (
                    <>
                        <GirdCard>
                            {filteredOverviews.map((card: IOverviewResponse) => (
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
                                        count_episode={card.count_episode}
                                        is_bookmark={card.is_bookmark ?? false}
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

export default New;
