import styles from './ECard.module.scss';
import classNames from 'classnames/bind';
import { Crown } from '../Assets/Crown';
import { Button } from '../Button/Button';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { EColor, EMovieType, ESize } from '../../enums';
import { dateToString } from '../../utils/date-to-string';
import { CiCalendar } from 'react-icons/ci';
import { RiPlayLargeLine } from 'react-icons/ri';
import { routes } from '../../configs';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ECard({
    overview_id,
    overview_title,
    overview_type,
    _id,
    title,
    description,
    duration,
    episode_number,
    img,
    premium,
    release_date,
}: {
    overview_id: string;
    overview_title: string;
    overview_type: EMovieType;
    _id: string;
    title: string;
    description: string;
    duration: number;
    episode_number: number;
    img: string;
    premium: boolean;
    release_date: Date;
}) {
    const navigate = useNavigate();

    return (
        <div className={cx('episode__card')} onClick={() => navigate(routes.watchURL(overview_id, _id, overview_title, title))}>
            <div className={cx('episode__card__container')}>
                <div className={cx('episode__card__content')}>
                    <div className={cx('episode__card__image')}>
                        <img src={`${img}=s400`} alt="Episode Card" />
                        {premium && (
                            <div className={cx('episode__card__premium')}>
                                <Crown width="1em" />
                                <span>Uncensored</span>
                            </div>
                        )}
                        <div className={cx('episode__card__duration')}>{duration}m</div>
                    </div>
                    <div className={cx('episode__card__title')}>
                        <h5 className={cx('episode__card__title__overview')}>{overview_title}</h5>
                        {overview_type === EMovieType.TV_SERIES ? (
                            <h5 className={cx('episode__card__title__episode')}>
                                <span>E{episode_number}</span>&nbsp;&#45;&nbsp;
                                <span>{title}</span>
                            </h5>
                        ) : (
                            <h5 className={cx('episode__card__title__episode')}>
                                <span>{title}</span>
                            </h5>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('episode__card__hover__container')}>
                <div className={cx('episode__card__hover__container__group__contents')}>
                    <div className={cx('episode__card__hover__title')}>
                        <h5 className={cx('episode__card__hover__title__overview')}>{overview_title}</h5>
                        {overview_type === EMovieType.TV_SERIES ? (
                            <h5 className={cx('episode__card__hover__title__episode')}>
                                <span>E{episode_number}</span>&nbsp;&#45;&nbsp;
                                <span>{title}</span>
                            </h5>
                        ) : (
                            <h5 className={cx('episode__card__hover__title__episode')}>
                                <span>{title}</span>
                            </h5>
                        )}
                    </div>
                    <div className={cx('episode__card__hover__releaseDate')}>
                        <Button leftIcon={<CiCalendar size={ESize.ICON - 5} />} contentCenter marginIcon disabled>
                            {dateToString(release_date)}
                        </Button>
                    </div>
                    <div className={cx('episode__card__hover__description')}>
                        <span className={cx('episode__card__hover__description__text')}>{description}</span>
                    </div>
                </div>
                <div className={cx('episode__card__hover__container__group__actions')}>
                    <div className={cx('episode__card__hover__container__play')}>
                        <Button leftIcon={<RiPlayLargeLine style={{ marginRight: '5px' }} size={ESize.ICON - 7.5} strokeWidth={1} />} contentCenter>
                            <span>Play</span>
                            {overview_type === EMovieType.TV_SERIES && <span>&nbsp;E{episode_number}</span>}
                        </Button>
                    </div>
                    <div className={cx('episode__card__hover__container__tick')}>
                        <Button
                            onClick={(e: any) => {
                                e.stopPropagation();
                            }}
                        >
                            <BiDotsVerticalRounded size={ESize.ICON - 5} color={EColor.GREY_COLOR} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ECard;
