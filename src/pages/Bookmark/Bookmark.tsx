import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Bookmark.module.scss';
import { Empty } from '../../components/Empty/Empty';
import { Button } from '../../components/Button/Button';
import { MdSort } from 'react-icons/md';
import { LuSettings2 } from 'react-icons/lu';
import { EColor, EMovieSort, EMovieType, ESize } from '../../enums';
import { FaRegBookmark } from 'react-icons/fa';
import { data } from '../../constants';
import { useBookmarks } from '../../hooks/useQueryOverviews';
import { GirdCard } from '../../components/GirdCard/GirdCard';
import { Filters } from '../../interfaces/overview.interface';
import { PCard } from '../../components/PCard/PCard';
import { useFilters } from '../../hooks/useFilters';
import { useClickOutside } from '../../hooks/useClickOutside';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import { IOverviewResponse } from '../../interfaces/overview.interface';

const cx = classNames.bind(styles);

function Bookmark() {
    const browseRef = useRef<HTMLButtonElement>(null);
    const filterRef = useRef<HTMLButtonElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const [isBrowseActive, setIsBrowseActive] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const { filters, updateFilter, resetFilters } = useFilters<Filters>({ language: 'all', media: 'all' });
    const { filters: filterSort, updateFilter: updateFilterSort } = useFilters<{ sort: EMovieSort }>({ sort: EMovieSort.DESC });

    useEffect(() => {
        document.title = 'A Project: Watch Popular Anime';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const { data: bookmarkOverviews, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useBookmarks(filterSort.sort);

    useClickOutside([browseRef, filterRef], () => {
        setIsBrowseActive(false);
        setIsFilterActive(false);
    });

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) fetchNextPage();
            },
            { threshold: 0.1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const filteredOverviews = useMemo(() => {
        const overviews =
            bookmarkOverviews?.pages
                .flatMap((page) => page.overviews) // Extract overviews array from each page
                .filter((overview): overview is IOverviewResponse => overview !== undefined) || [];

        return overviews
            .filter((overview) => {
                if (filters.language === 'subtitle') return overview.subtitle_languages.length > 0;
                if (filters.language === 'dub') return overview.dub_languages.length > 0;
                return true;
            })
            .filter((overview) => {
                if (filters.media === 'series') return overview.type === EMovieType.TV_SERIES;
                if (filters.media === 'movie') return overview.type === EMovieType.MOVIE;
                return true;
            });
    }, [bookmarkOverviews, filters]);

    const isEmpty = !isLoading && filteredOverviews.length === 0;

    if (isError) return <div className={cx('status')}>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;

    return (
        <div className={cx('bookmarkWrapper')}>
            <div className={cx('bookmarkContainer')}>
                <div className={cx('bookmarkContainer__header')}>
                    <FaRegBookmark size={ESize.ICON + 5} />
                    <h2>Bookmark</h2>
                </div>

                <div className={cx('bookmarkContainer__body')}>
                    {isLoading && <div className={cx('status')}></div>}

                    {!isLoading && bookmarkOverviews && bookmarkOverviews?.pages.flatMap((page) => page.overviews).length > 0 && (
                        <>
                            <div className={cx('bookmarkContainer__body__header')}>
                                <h3>Bookmark Activity</h3>
                                <div className={cx('bookmarkContainer__body__header__actions')}>
                                    <button
                                        ref={browseRef}
                                        className={cx('bookmarkContainer__body__header__actions__btn', { active: isBrowseActive })}
                                        onClick={() => {
                                            setIsBrowseActive(!isBrowseActive);
                                            setIsFilterActive(false);
                                        }}
                                    >
                                        <MdSort size={ESize.ICON} color={EColor.GREY_COLOR} />
                                        <span className={cx('bookmarkContainer__body__header__title')}>{filterSort.sort === EMovieSort.DESC ? 'Recently added' : 'Oldest added'}</span>
                                        {isBrowseActive && (
                                            <div className={cx('bookmarkContainer__body__browser__dropdown__container')}>
                                                <ul className={cx('bookmarkContainer__body__browser__dropdown__container__scrollable')}>
                                                    <li
                                                        className={cx('bookmarkContainer__body__browser__dropdown__container__item', { active: filterSort.sort === EMovieSort.DESC })}
                                                        onClick={() => updateFilterSort('sort', EMovieSort.DESC)}
                                                    >
                                                        Recently added
                                                    </li>
                                                    <li
                                                        className={cx('bookmarkContainer__body__browser__dropdown__container__item', { active: filterSort.sort === EMovieSort.ASC })}
                                                        onClick={() => updateFilterSort('sort', EMovieSort.ASC)}
                                                    >
                                                        Oldest added
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        ref={filterRef}
                                        className={cx('bookmarkContainer__body__header__actions__btn', {
                                            hover: filters.language !== 'all' || filters.media !== 'all',
                                            active: isFilterActive,
                                        })}
                                        onClick={() => {
                                            setIsBrowseActive(false);
                                            setIsFilterActive(!isFilterActive);
                                        }}
                                    >
                                        <LuSettings2 size={ESize.ICON} color={EColor.GREY_COLOR} />
                                        <span className={cx('bookmarkContainer__body__header__title')}>Filter</span>
                                        <FilterDropdown isActive={isFilterActive} filters={filters} onFilterChange={updateFilter} />
                                    </button>
                                </div>
                            </div>

                            {(filters.language !== 'all' || filters.media !== 'all') && (
                                <div className={cx('bookmarkContainer__body__filter')}>
                                    <Button contentStart onClick={resetFilters}>
                                        <div className={cx('bookmarkContainer__body__filter__btn')}>
                                            <h4 className={cx('bookmarkContainer__body__filter__btn__title')}>Reset Filters:</h4>
                                            <span className={cx('bookmarkContainer__body__filter__btn__title')}>{filters.language}</span>
                                            <span className={cx('bookmarkContainer__body__filter__btn__title')}>{filters.media}</span>
                                        </div>
                                    </Button>
                                </div>
                            )}

                            <GirdCard lagre>
                                {filteredOverviews.map((card) => (
                                    <div key={card._id} className={cx('heroCard__slide')}>
                                        <PCard {...card} is_bookmark={card.is_bookmark ?? false} useBackdrop />
                                    </div>
                                ))}
                            </GirdCard>

                            {hasNextPage && !isFetchingNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
                        </>
                    )}

                    {isEmpty && <Empty img={data.imgSrc.EMPTY_LISTS} text="You don't have any bookmarks yet." />}
                </div>
            </div>
        </div>
    );
}

export default Bookmark;
