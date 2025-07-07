import classNames from 'classnames/bind';
import styles from '@/components/ListComment/ListComment.module.scss';
import { EColor, EMovieSort, ESize } from '@/enums';
import AddComment from '@/components/AddComment/AddComment';
import { MdSort } from 'react-icons/md';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useClickOutside } from '@/hooks/useClickOutside';
import { CommentService } from '@/services/comment.service';
import { ICommentRespone } from '@/interfaces/comment.interface';
import { useCommentInfinite } from '@/hooks/useQueryComments';
import { Comment } from '@/components/Comment/Comment';

const cx = classNames.bind(styles);

export function ListComment({ episode_id, count_comment }: { episode_id: string; count_comment: number }) {
    const filterRef = useRef<HTMLButtonElement>(null);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const { filters, updateFilter } = useFilters<{ sort: EMovieSort }>({ sort: EMovieSort.DESC });

    const {
        data: dataComments,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingComments,
    } = useCommentInfinite(
        ['comments', 'episode', episode_id, filters.sort],
        ({ _id, limit, cursor, sort }) => CommentService.getCommentsByEpisode(_id, limit, cursor, sort),
        {
            _id: episode_id,
            sort: filters.sort,
        },
        20
    );

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

        observer.observe(loadMoreRef.current); // Sử dụng loadMoreRef.current ở đây
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const sortedComments = useMemo(() => {
        const comments = dataComments?.pages
            .flatMap((page) => page.comments) // Extract overviews array from each page
            .filter((comment): comment is ICommentRespone => comment !== undefined);

        if (!comments) return [];

        return comments.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            return filters.sort === EMovieSort.ASC ? dateA - dateB : dateB - dateA;
        });
    }, [dataComments?.pages, filters.sort]);

    useClickOutside([filterRef], () => {
        setIsFilterActive(false);
    });

    const isLoading = isLoadingComments;

    return (
        <div className={cx('listCommentContainer')}>
            <div className={cx('listCommentContainer__header')}>
                <h4 className={cx('listCommentContainer__header__title')}>
                    <span>{count_comment}</span>&nbsp;
                    <span>Comment</span>
                </h4>
                <div className={cx('listCommentContainer__header__actions')}>
                    <button
                        ref={filterRef}
                        className={cx('listCommentContainer__browser__actions__btn', { active: false })}
                        onClick={() => {
                            setIsFilterActive(!isFilterActive);
                        }}
                    >
                        <MdSort size={ESize.ICON} color={EColor.GREY_COLOR} />
                        <span className={cx('listCommentContainer__browser__actions__btn__title')}>Sort by</span>
                        <div className={cx('listCommentContainer__browser__actions__dropdown', { active: isFilterActive })}>
                            <div className={cx('listCommentContainer__browser__actions__dropdown__scrollable')}>
                                <div
                                    className={cx('listCommentContainer__browser__actions__dropdown__item', {
                                        active: filters.sort === EMovieSort.DESC,
                                    })}
                                    onClick={() => updateFilter('sort', EMovieSort.DESC)}
                                >
                                    Newest
                                </div>
                                <div
                                    className={cx('listCommentContainer__browser__actions__dropdown__item', {
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
            </div>
            <div className={cx('listCommentContainer__body')}>
                <AddComment episode_id={episode_id} sort_comment={filters.sort} />
                {sortedComments.map((comment: ICommentRespone, index) => {
                    return (
                        <div className={cx('listCommentContainer__body__container')} key={index}>
                            <Comment
                                key={comment._id}
                                episode_id={episode_id}
                                _id={comment._id}
                                parent_id={comment._id}
                                profile_id={comment.profile_id}
                                first_name={comment.first_name}
                                last_name={comment.last_name}
                                titles={comment.titles}
                                experience={comment.experience}
                                img={comment.img}
                                text={comment.text}
                                is_edit={comment.is_edit}
                                is_like={comment.is_like ?? false}
                                is_dislike={comment.is_dislike ?? false}
                                count_child={comment.count_child}
                                count_like={comment.count_like}
                                count_dislike={comment.count_dislike}
                                created_at={comment.created_at}
                                sort_child_comment={filters.sort}
                            />
                        </div>
                    );
                })}
                {isLoading && <div className={cx('listCommentContainer__body__loading')}></div>}
            </div>

            {/* Infinite Load Trigger */}
            {hasNextPage && !isFetchingNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
        </div>
    );
}
