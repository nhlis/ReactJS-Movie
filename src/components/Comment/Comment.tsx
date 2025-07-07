import { useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { BiDislike, BiDotsVerticalRounded, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { CgCornerDownRight } from 'react-icons/cg';

import styles from '@/components/Comment/Comment.module.scss';
import { Button } from '@/components/Button/Button';
import { EColor, EMovieSort, ESize } from '@/enums';
import Avatar from '@/components/Assets/Avatar';
import AddComment from '@/components/AddComment/AddComment';
import { getTimeAgo } from '@/utils/get-time-ago';
import useAuthStore from '@/stores/auth.store';
import { ReactionService } from '@/services/reaction.service';
import useMutationReaction from '@/hooks/useMutationReaction';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useCommentInfinite } from '@/hooks/useQueryComments';
import { CommentService } from '@/services/comment.service';
import { ICommentRespone } from '@/interfaces/comment.interface';
import { useMutationDeleteComment } from '@/hooks/useMutationComment';
import { MdOutlineDelete, MdOutlineModeEdit, MdOutlineOutlinedFlag } from 'react-icons/md';
import { useClickOutside } from '@/hooks/useClickOutside';
import EditComment from '@/components/EditComment/EditComment';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

export function Comment({
    episode_id,
    _id,
    profile_id,
    first_name,
    last_name,
    titles,
    experience,
    img,
    text,
    is_edit,
    is_like,
    is_dislike,
    count_child,
    count_like,
    count_dislike,
    created_at,
    sort_child_comment,
    parent_id,
    reply_first_name,
    reply_last_name,
}: {
    episode_id: string;
    _id: string;
    profile_id: string;
    first_name: string;
    last_name?: string;
    titles: { title: string; color: string }[];
    experience: number;
    img: string;
    text: string;
    count_child: number;
    count_like: number;
    count_dislike: number;
    created_at: Date;
    sort_child_comment: EMovieSort;
    parent_id?: string;
    is_edit?: boolean;
    is_like?: boolean;
    is_dislike?: boolean;
    reply_id?: string;
    reply_profile_id?: string;
    reply_first_name?: string;
    reply_last_name?: string;
}) {
    const [showAddComment, setShowAddComment] = useState<boolean>(false);
    const [showChildComment, setShowChildComment] = useState<boolean>(false);
    const [isActionComment, setIsActionComment] = useState<boolean>(false);
    const actionsCommentRef = useRef<HTMLButtonElement>(null);
    const [isEditComment, setIsEditComment] = useState<boolean>(false);
    const { profile } = useAuthStore();
    const [readMore, setReadMore] = useState<boolean>(false);
    const maxChar = 200;

    useClickOutside([actionsCommentRef], () => {
        setIsActionComment(false);
    });

    const { deleteComment } = useMutationDeleteComment({ _id, parent_id }, [
        ['comments', 'episode', episode_id, sort_child_comment],
        ['comments', 'child', parent_id, sort_child_comment],
    ]);

    const {
        data: childCommentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingComments,
    } = useCommentInfinite(
        ['comments', 'child', _id, sort_child_comment],
        ({ _id, limit, cursor, sort }) => CommentService.getCommentsByParentComment(_id, limit, cursor, sort),
        { _id: _id, sort: sort_child_comment },
        20,
        showChildComment
    );

    // Sort episodes based on filters
    const sortedChildComments = useMemo(() => {
        const comments = childCommentsData?.pages
            .flatMap((page) => page.comments) // Extract overviews array from each page
            .filter((comment): comment is ICommentRespone => comment !== undefined);

        if (!comments) return [];

        return comments.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            return sort_child_comment === EMovieSort.ASC ? dateA - dateB : dateB - dateA;
        });
    }, [childCommentsData?.pages]);

    const allChildCommentsMap = useMemo(() => {
        const comments = childCommentsData?.pages
            .flatMap((page) => page.comments) // Extract overviews array from each page
            .filter((comment): comment is ICommentRespone => comment !== undefined);

        if (!comments || comments.length === 0) return new Map<string, ICommentRespone>();

        return new Map([...comments].map((c) => [c._id, c]));
    }, [childCommentsData?.pages]);

    const level = useMemo(() => {
        return Math.floor(Math.log(experience / 2 + 1) / Math.log(1.5)) + 1;
    }, [experience]);

    const { localReaction: localLike, handleReactionClick: handleLikeClick } = useMutationReaction(
        is_like ? true : false,
        _id,
        ReactionService.postReactionLikeComment,
        ReactionService.deleteReactionLikeComment,
        ['comments']
    );

    const { localReaction: localDisike, handleReactionClick: handleDislikeClick } = useMutationReaction(
        is_dislike ? true : false,
        _id,
        ReactionService.postReactionDislikeComment,
        ReactionService.deleteReactionDislikeComment,
        ['comments']
    );

    const isLoading = isLoadingComments;

    return (
        <>
            {isEditComment ? (
                <div>
                    <EditComment
                        comment_id={_id}
                        originalText={text}
                        onFocus
                        sort_comment={sort_child_comment}
                        onSuccess={() => setIsEditComment(!isEditComment)}
                        onCancel={() => setIsEditComment(!isEditComment)}
                    />
                </div>
            ) : (
                <div className={cx('commentContainer')}>
                    <Avatar className={cx('commentContainer__avatar')} src={img} width="50px" borderRadius="10px" marginLeft="0" marginRight="15px" />
                    <div className={cx('commentContainer__content')}>
                        <div className={cx('commentContainer__content__header')}>
                            <div className={cx('commentContainer__content__header__group__main')}>
                                <div className={cx('commentContainer__content__header__group__main__user')}>
                                    <h3 className={cx('commentContainer__content__header__name')}>{`${first_name} ${last_name || ''}`}</h3>
                                    <h5 className={cx('commentContainer__content__header__timeAgo')}>{getTimeAgo(created_at)}</h5>
                                    {is_edit && <h5 className={cx('commentContainer__content__header__timeAgo')}>(edited)</h5>}
                                </div>
                            </div>
                            <div className={cx('commentContainer__content__header__group__extra')}>
                                {Array.isArray(titles) &&
                                    titles.map((a, index) => (
                                        <h3 key={index} className={cx('commentContainer__content__header__title')} data-color={a.color}>
                                            {a.title}
                                        </h3>
                                    ))}
                                <h5 className={cx('commentContainer__content__header__level')} data-level={level}>
                                    <span>Lv.</span>
                                    <span>{level}</span>
                                </h5>
                            </div>
                        </div>
                        <div className={cx('commentContainer__content__body')}>
                            {reply_first_name && (
                                <Button className={cx('commentContainer__content__username')}>
                                    @{reply_first_name} {reply_last_name}
                                </Button>
                            )}
                            <span className={cx('commentContainer__content__body__text')}>
                                {(text && text.length > maxChar && !readMore ? text.slice(0, maxChar) + '...' : text).split('\n').map((line, index) => (
                                    <span key={index} className={cx({ clamp: !readMore })}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </span>
                        </div>

                        {text && text.length > maxChar && (
                            <Button contentCenter className={cx('commentContainer__content__body__text__show')} onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'Show less' : 'Read more'}
                            </Button>
                        )}

                        <AuthProvider>
                            <div className={cx('commentContainer__content__body__actions')}>
                                <Button className={cx('commentContainer__content__body__actions__btn')} onClick={() => handleLikeClick()}>
                                    {localLike ? <BiSolidLike size={ESize.ICON - 3} /> : <BiLike size={ESize.ICON - 3} />}
                                    <span className={cx('commentContainer__content__body__actions__btn__title')}>{count_like}</span>
                                </Button>
                                <Button className={cx('commentContainer__content__body__actions__btn')} onClick={() => handleDislikeClick()}>
                                    {localDisike ? <BiSolidDislike size={ESize.ICON - 3} /> : <BiDislike size={ESize.ICON - 3} />}
                                    <span className={cx('commentContainer__content__body__actions__btn__title')}>{count_dislike}</span>
                                </Button>
                                <Button contentCenter hover padding rounded onClick={() => setShowAddComment(true)}>
                                    Reply
                                </Button>
                            </div>
                        </AuthProvider>

                        {showAddComment && (
                            <div className={cx('commentContainer__content__reply')}>
                                <AddComment
                                    episode_id={episode_id}
                                    parent_id={parent_id}
                                    reply_id={parent_id === _id ? undefined : _id}
                                    reply_profile_id={parent_id === _id ? undefined : profile_id}
                                    reply_first_name={parent_id === _id ? undefined : first_name}
                                    reply_last_name={parent_id === _id ? undefined : last_name}
                                    onFocus
                                    onCancel={() => setShowAddComment(false)}
                                    onSuccess={() => setShowAddComment(false)}
                                    sort_comment={sort_child_comment}
                                />
                            </div>
                        )}

                        {count_child > 0 && (
                            <div className={cx('commentContainer__show__child')}>
                                <Button
                                    className={cx('commentContainer__show__child__btn')}
                                    leftIcon={showChildComment ? <FaChevronUp /> : <FaChevronDown />}
                                    hover
                                    rounded
                                    small
                                    onClick={() => setShowChildComment(!showChildComment)}
                                >
                                    {count_child} Reply
                                </Button>
                            </div>
                        )}

                        {showChildComment && (
                            <div className={cx('commentContainer__child')}>
                                {sortedChildComments.map((comment: ICommentRespone, index) => {
                                    const replyFirstName = comment.reply_id ? allChildCommentsMap.get(comment.reply_id)?.first_name : undefined;
                                    const replyLastName = comment.reply_id ? allChildCommentsMap.get(comment.reply_id)?.last_name : undefined;

                                    return (
                                        <div className={cx('commentContainer__child__comment')} key={index}>
                                            <Comment
                                                key={comment._id}
                                                episode_id={episode_id}
                                                _id={comment._id}
                                                parent_id={parent_id}
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
                                                sort_child_comment={EMovieSort.DESC}
                                                reply_profile_id={comment.reply_profile_id}
                                                reply_first_name={replyFirstName}
                                                reply_last_name={replyLastName}
                                            />
                                        </div>
                                    );
                                })}
                                {/* Load More Button */}
                                {count_child > sortedChildComments.length && hasNextPage && (
                                    <div className={cx('commentContainer__child__loadmore')}>
                                        <Button
                                            disabled={isFetchingNextPage}
                                            className={cx('commentContainer__child__loadmore__btn')}
                                            leftIcon={<CgCornerDownRight size={ESize.ICON} fill={'red'} />}
                                            onClick={() => fetchNextPage()}
                                        >
                                            {isFetchingNextPage ? '' : 'Load more reply'}
                                        </Button>
                                    </div>
                                )}
                                {isLoading && <div className={cx('commentContainer__child__comment__loading')}></div>}
                            </div>
                        )}
                    </div>
                    <div className={cx('commentContainer__content__actions')}>
                        <button className={cx('commentContainer__content__actions__btn', { active: isActionComment })} ref={actionsCommentRef} onClick={() => setIsActionComment(!isActionComment)}>
                            <BiDotsVerticalRounded size={ESize.ICON} color={EColor.GREY_COLOR} />
                            <div className={cx('commentContainer__content__actions__btn__dropdown', { active: isActionComment })}>
                                <div className={cx('commentContainer__content__actions__btn__dropdown__scrollable')}>
                                    {profile && profile_id === profile._id && (
                                        <>
                                            <div className={cx('commentContainer__content__actions__btn__dropdown__item')} onClick={() => setIsEditComment(!isEditComment)}>
                                                <MdOutlineModeEdit size={ESize.ICON - 5} />
                                                Edit
                                            </div>
                                            <div className={cx('commentContainer__content__actions__btn__dropdown__item')} onClick={() => deleteComment({ comment_id: _id })}>
                                                <MdOutlineDelete size={ESize.ICON - 5} />
                                                Delete
                                            </div>
                                        </>
                                    )}
                                    <div className={cx('commentContainer__content__actions__btn__dropdown__item')}>
                                        <MdOutlineOutlinedFlag size={ESize.ICON - 5} />
                                        Report
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
