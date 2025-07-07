import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from '@/pages/History/History.module.scss';
import { Empty } from '@/components/Empty/Empty';
import { Button } from '@/components/Button/Button';
import { FaHistory } from 'react-icons/fa';
import { ESize } from '@/enums';
import { data } from '@/constants';
import { useHistories } from '@/hooks/useQueryHistories';
import HCard from '@/components/HCard/HCard';
import { IHistoryRespone } from '@/interfaces/history.interface';
import useMutationHistory from '@/hooks/useMutationHistory';

const cx = classNames.bind(styles);

function History() {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = 'A Project: Watch Popular Anime';
    }, []);

    const { data: historiesData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useHistories();

    // Infinite Scroll Observer
    useEffect(() => {
        const target = loadMoreRef.current;
        if (!target || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const histories = useMemo(() => {
        return (
            historiesData?.pages
                .flatMap((page) => page.histories) // Extract histories array from each page
                .filter((h): h is IHistoryRespone => h !== undefined) || [] // Ensure non-undefined items
        );
    }, [historiesData]);

    const isEmpty = !isLoading && histories.length === 0;

    const { clearHistories } = useMutationHistory();

    return (
        <div className={cx('historyWrapper')}>
            <div className={cx('historyContainer')}>
                <div className={cx('historyContainer__header')}>
                    <FaHistory size={ESize.ICON + 5} />
                    <h2>History</h2>
                </div>

                <div className={cx('historyContainer__body')}>
                    {isLoading && <div className={cx('status')}></div>}

                    {!isLoading && histories.length > 0 && (
                        <>
                            <div className={cx('historyContainer__body__header')}>
                                <h3>History Episodes</h3>
                                <Button onClick={() => clearHistories()}>Clear History</Button>
                            </div>

                            <div className={cx('historyContainer__body__content')}>
                                {histories.map((h: IHistoryRespone, index) => (
                                    <HCard
                                        key={index}
                                        _id={h._id}
                                        overview_id={h.overview_id}
                                        overview_title={h.overview_title}
                                        overview_type={h.overview_type}
                                        episode_id={h.episode_id}
                                        episode_title={h.episode_title}
                                        episode_description={h.episode_description}
                                        episode_duration={h.episode_duration}
                                        episode_number={h.episode_number}
                                        episode_img={h.episode_img}
                                        episode_premium={h.episode_premium}
                                        episode_release_date={h.episode_release_date}
                                    />
                                ))}
                            </div>

                            {/* Infinite Load Trigger */}
                            {hasNextPage && !isFetchingNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
                        </>
                    )}

                    {isEmpty && <Empty img={data.imgSrc.EMPTY_LISTS} text="Your watch history will appear here once you start watching content." />}
                </div>
            </div>
        </div>
    );
}

export default History;
