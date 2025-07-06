import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames/bind';

import styles from './PCard.module.scss';
import { FaPlus, FaStar } from 'react-icons/fa';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { EColor, EMovieType, ESize } from '../../enums';
import { Button } from '../Button/Button';
import { routes } from '../../configs';
import { slugToString } from '../../utils/handle-slug';
import { GrPlay } from 'react-icons/gr';
import useMutationBookmark from '../../hooks/useMutationBookmark';
import AuthProvider from '../AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

export function PCard({
    _id,
    original_title,
    description,
    subtitle_languages,
    dub_languages,
    type,
    poster,
    backdrop,
    count_season,
    count_episode,
    average_rating,
    count_rating,
    is_bookmark,
    useBackdrop = false,
}: {
    _id: string;
    original_title: string;
    description: string;
    subtitle_languages: Array<string>;
    dub_languages: Array<string>;
    type: EMovieType;
    poster: string;
    backdrop: string;
    count_season: number;
    count_episode: number;
    average_rating: number;
    count_rating: number;
    is_bookmark: boolean;
    useBackdrop?: boolean;
}) {
    const navigate = useNavigate();
    const imgRef = useRef<HTMLImageElement>(null);
    const [bgImage, setBgImage] = useState<string>('');
    const { localBookmark, handleBookmarkClick } = useMutationBookmark(is_bookmark, _id);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setBgImage(e.currentTarget.currentSrc);
    };

    return (
        <div className={cx('posterCard__container', { useBackdrop })} onClick={() => navigate(routes.overviewURL(_id, original_title))}>
            <div className={cx('posterCard__content')}>
                <div className={cx('posterCard__img')}>
                    <img
                        onLoad={handleImageLoad}
                        ref={imgRef}
                        srcSet={`${useBackdrop ? backdrop : poster}=s500 500w, ${useBackdrop ? backdrop : poster}=s600 600w`}
                        sizes="(max-width: 992px) 500px, (max-width: 1280px) 600px, 700px"
                        src={`${useBackdrop ? backdrop : poster}=s700`}
                        alt="Card Poster"
                        loading="lazy"
                    />
                </div>
                <h4 className={cx('posterCard__title')}>{original_title}</h4>
                {subtitle_languages.length > 0 && dub_languages.length > 0 ? (
                    <span className={cx('dot')}>Sub&nbsp;&#124;&nbsp;Dub</span>
                ) : subtitle_languages.length > 0 ? (
                    <span className={cx('dot')}>Subtitled</span>
                ) : dub_languages.length > 0 ? (
                    <span className={cx('dot')}>Dubtitled</span>
                ) : (
                    <span className={cx('dot')}>Raw</span>
                )}
            </div>
            <div
                className={cx('posterCard__hover__container')}
                style={
                    {
                        '--bg-url': `url(${bgImage})`,
                    } as React.CSSProperties
                }
            >
                <h4 className={cx('posterCard__hover__title')}>{original_title}</h4>
                <div className={cx('posterCard__hover__rating')}>
                    <span>{average_rating.toFixed(1)}</span>&nbsp;
                    <span>
                        <FaStar />
                    </span>
                    &nbsp;
                    <span>{count_rating}</span>&nbsp;
                    <span>Votes</span>
                </div>
                {type === EMovieType.MOVIE ? (
                    <>
                        <div className={cx('posterCard__hover__type')}>{slugToString(type)}</div>
                    </>
                ) : (
                    <>
                        <div className={cx('posterCard__hover__season')}>
                            <div>
                                <span>{count_season}</span>&nbsp;<span>Seasons</span>
                            </div>
                            <div>
                                <span>{count_episode}</span>&nbsp;<span>Episodes</span>
                            </div>
                        </div>
                    </>
                )}
                <div className={cx('posterCard__hover__description')}>
                    <span>{description}</span>
                </div>
                <div className={cx('posterCard__hover__actions')}>
                    <Button
                        contentCenter
                        onClick={(e: any) => {
                            e.stopPropagation();
                        }}
                    >
                        <GrPlay color={EColor.PRIMARY_COLOR} size={ESize.ICON - 5} strokeWidth={1} />
                    </Button>
                    <AuthProvider>
                        {localBookmark ? (
                            <Button
                                contentCenter
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleBookmarkClick();
                                }}
                            >
                                <FaBookmark size={ESize.ICON - 5} color={EColor.PRIMARY_COLOR} strokeWidth={1} />
                            </Button>
                        ) : (
                            <Button
                                contentCenter
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleBookmarkClick();
                                }}
                            >
                                <FaRegBookmark size={ESize.ICON - 5} color={EColor.PRIMARY_COLOR} strokeWidth={1} />
                            </Button>
                        )}
                    </AuthProvider>
                    <Button
                        contentCenter
                        onClick={(e: any) => {
                            e.stopPropagation();
                        }}
                        disabled
                    >
                        <FaPlus size={ESize.ICON - 5} color={EColor.PRIMARY_COLOR} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
