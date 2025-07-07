import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/Slide/Slide.module.scss';
import { AgeRating14, AgeRating16 } from '@/components/Assets/AgeRating';
import { Button } from '@/components/Button/Button';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { EAgeRating, EColor, EMovieType, ESize } from '@/enums';
import { RiPlayLargeLine } from 'react-icons/ri';
import { routes } from '@/configs/routes/routes';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { slugToString } from '@/utils/handle-slug';
import { IOverviewResponse } from '@/interfaces/overview.interface';
import useMutationBookmark from '@/hooks/useMutationBookmark';
import useMutationRating from '@/hooks/useMutationRating';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

export const Slide: React.FC<{
    overview: IOverviewResponse;
    layout: 'main' | 'overview';
    type?: EMovieType;
    episode_id?: string;
    episode_number?: number;
    episode_title?: string;
}> = ({ overview, layout = 'main', type, episode_id, episode_number, episode_title }) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const { localBookmark, handleBookmarkClick } = useMutationBookmark(overview.is_bookmark ?? false, overview._id);
    const { localRating, handleRatingClick } = useMutationRating({
        old_rating_point: overview?.rating_point,
        overview_id: overview?._id,
    });

    const renderStars = (averageRating: number): JSX.Element[] => {
        const stars = [];

        // Nếu localRating là -1 (chưa có đánh giá từ người dùng), sử dụng averageRating
        const displayRating = hoverRating ? hoverRating : localRating !== -1 ? localRating : averageRating;

        const roundedRating = Math.round(displayRating * 2) / 2;

        // Nếu đang hover hoặc đã vote (có localRating), dùng màu vàng
        // Còn lại (chỉ hiển thị average), dùng màu cyan
        const color = localRating !== -1 || hoverRating ? 'gold' : 'cyan';

        for (let i = 1; i <= 5; i++) {
            const starProps = {
                size: ESize.ICON + 5,
                onMouseEnter: () => setHoverRating(i),
                onMouseLeave: () => setHoverRating(null),
                onClick: () => handleRatingClick(i),
                style: { cursor: 'pointer' },
            };

            if (roundedRating >= i) {
                stars.push(<FaStar key={i} {...starProps} color={color} />);
            } else if (roundedRating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} {...starProps} color={color} />);
            } else {
                stars.push(<FaRegStar key={i} {...starProps} color={color} />);
            }
        }
        return stars;
    };

    return (
        <div className={cx('slideContainer')}>
            <div className={cx('slideBackground')}>
                <picture>
                    <source media="(max-width: 768px)" srcSet={`${overview.poster}=s800`} />
                    <source media="(max-width: 1280px)" srcSet={`${overview.backdrop}=s1000`} />
                    <img src={`${overview.backdrop}=s2000`} loading="lazy" />
                </picture>
            </div>
            <div className={cx('slideLogo')}>
                <img
                    srcSet={`${overview.logo}=s200 200w, ${overview.logo}=s300 300w, ${overview.logo}=s400 400w, ${overview.logo}=s500 500w`}
                    sizes="(max-width: 576px) 200px, (max-width: 768px) 300px, (max-width: 992px) 400px, (max-width: 1280px) 500px, 600px"
                    src={`${overview.logo}=s600`}
                    alt="overview Logo"
                    loading="lazy"
                />
            </div>
            <div className={cx('slideBody')}>
                <div className={cx('slideBody__header')}>
                    <span>{overview.age_rating === EAgeRating.PG_13 + 1 ? <AgeRating14 width="35px" /> : <AgeRating16 width="35px" />}</span>
                    {overview.subtitle_languages.length > 0 && overview.dub_languages.length > 0 ? (
                        <span className={cx('dot')}>• Sub | Dub</span>
                    ) : overview.subtitle_languages.length > 0 ? (
                        <span className={cx('dot')}>• Subtitled</span>
                    ) : overview.dub_languages.length > 0 ? (
                        <span className={cx('dot')}>• Dubtitled</span>
                    ) : (
                        <span className={cx('dot')}>• Raw</span>
                    )}
                    <span className={cx('dot')}>
                        •&nbsp;
                        {overview.genres.slice(0, 3).map((gen: any, index: any, arr: any) => (
                            <span key={index}>
                                {slugToString(gen)}
                                {index !== arr.length - 1 && <> | </>}
                            </span>
                        ))}
                        {overview.genres.length > 3 && <> ...</>}
                    </span>
                </div>
                {layout === 'main' ? (
                    <div className={cx('slideBody__description')}>
                        <span>{overview.description}</span>
                    </div>
                ) : (
                    <div className={cx('slideBody__rating')}>
                        <AuthProvider>
                            <div className={cx('slideBody__rating__stars')}>{renderStars(overview.average_rating)}</div>
                        </AuthProvider>
                        <div className={cx('slideBody__rating__ageRating')}>
                            <span>Average Rating:&nbsp;</span>
                            <span>{overview.average_rating.toFixed(1)}&nbsp;</span>
                            <span>({overview.count_rating} Votes) </span>
                        </div>
                    </div>
                )}
                <div className={cx('slideBody__actions')}>
                    {layout === 'main' ? (
                        <Button to={routes.overviewURL(overview._id, overview.original_title)} className={cx('slideBody__actions__btn__play')} contentCenter padding primary>
                            <span className={cx('slideBody__actions__btn__play__text')}>Show Info & Episodes</span>
                        </Button>
                    ) : (
                        <div>
                            {episode_id && episode_title ? (
                                <Button
                                    to={routes.watchURL(overview._id, episode_id, overview.original_title, episode_title)}
                                    className={cx('slideBody__actions__btn__play')}
                                    contentCenter
                                    padding
                                    primary
                                >
                                    <RiPlayLargeLine style={{ marginRight: '10px' }} size={ESize.ICON - 5} strokeWidth={1} />
                                    {type === EMovieType.TV_SERIES ? (
                                        <span className={cx('slideBody__actions__btn__play__text')}>Start watching E{episode_number}</span>
                                    ) : (
                                        <span className={cx('slideBody__actions__btn__play__text')}> Start watching</span>
                                    )}
                                </Button>
                            ) : (
                                <Button className={cx('slideBody__actions__btn__play')} contentCenter padding primary>
                                    <span className={cx('slideBody__actions__btn__play__text')}>Coming Soon</span>
                                </Button>
                            )}
                        </div>
                    )}

                    <AuthProvider>
                        {localBookmark ? (
                            <Button padding outline className={cx('slideBody__actions__btn__bookmark')} contentCenter onClick={() => handleBookmarkClick()}>
                                <FaBookmark size={ESize.ICON - 5} color={EColor.PRIMARY_COLOR} strokeWidth={1} />
                            </Button>
                        ) : (
                            <Button padding outline className={cx('slideBody__actions__btn__bookmark')} contentCenter onClick={() => handleBookmarkClick()}>
                                <FaRegBookmark size={ESize.ICON - 5} color={EColor.PRIMARY_COLOR} strokeWidth={1} />
                            </Button>
                        )}
                    </AuthProvider>
                </div>
            </div>
        </div>
    );
};
