import styles from '@/components/HCard/HCard.module.scss';
import classNames from 'classnames/bind';
import { Crown } from '@/components/Assets/Crown';
import { Button } from '@/components/Button/Button';
import { EColor, EMovieType, ESize } from '@/enums';
import { dateToString } from '@/utils/date-to-string';
import { CiCalendar } from 'react-icons/ci';
import { RiPlayLargeLine } from 'react-icons/ri';
import { routes } from '@/configs';
import { useNavigate } from 'react-router';
import { MdDelete } from 'react-icons/md';
import useMutationHistory from '@/hooks/useMutationHistory';

const cx = classNames.bind(styles);

function HCard({
    _id,
    overview_id,
    overview_title,
    overview_type,
    episode_id,
    episode_title,
    episode_description,
    episode_duration,
    episode_number,
    episode_img,
    episode_premium,
    episode_release_date,
}: {
    _id: string;
    overview_id: string;
    overview_title: string;
    overview_type: EMovieType;
    episode_id: string;
    episode_title: string;
    episode_description: string;
    episode_duration: number;
    episode_number: number;
    episode_img: string;
    episode_premium: boolean;
    episode_release_date: Date;
}) {
    const navigate = useNavigate();

    const { deleteHistory } = useMutationHistory();

    return (
        <div className={cx('history__card')} onClick={() => navigate(routes.watchURL(overview_id, episode_id, overview_title, episode_title))}>
            <div className={cx('history__card__container')}>
                <div className={cx('history__card__content')}>
                    <div className={cx('history__card__image')}>
                        <img src={`${episode_img}=s400`} alt="Episode Card" />
                        {episode_premium && (
                            <div className={cx('history__card__premium')}>
                                <Crown width="1em" />
                                <span>Uncensored</span>
                            </div>
                        )}
                        <div className={cx('history__card__duration')}>{episode_duration}m</div>
                    </div>
                    <div className={cx('history__card__title')}>
                        <h5 className={cx('history__card__title__overview')}>{overview_title}</h5>
                        {overview_type === EMovieType.TV_SERIES ? (
                            <h5 className={cx('history__card__title__episode')}>
                                <span>E{episode_number}</span>&nbsp;&#45;&nbsp;
                                <span>{episode_title}</span>
                            </h5>
                        ) : (
                            <h5 className={cx('history__card__title__episode')}>
                                <span>{episode_title}</span>
                            </h5>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('history__card__hover__container')}>
                <div className={cx('history__card__hover__container__group__contents')}>
                    <div className={cx('history__card__hover__title')}>
                        <h5 className={cx('history__card__hover__title__overview')}>{overview_title}</h5>
                        {overview_type === EMovieType.TV_SERIES ? (
                            <h5 className={cx('history__card__hover__title__episode')}>
                                <span>E{episode_number}</span>&nbsp;&#45;&nbsp;
                                <span>{episode_title}</span>
                            </h5>
                        ) : (
                            <h5 className={cx('history__card__hover__title__episode')}>
                                <span>{episode_title}</span>
                            </h5>
                        )}
                    </div>
                    <div className={cx('history__card__hover__releaseDate')}>
                        <Button leftIcon={<CiCalendar size={ESize.ICON - 5} />} contentCenter marginIcon disabled>
                            {dateToString(episode_release_date)}
                        </Button>
                    </div>
                    <div className={cx('history__card__hover__description')}>
                        <span>{episode_description}</span>
                    </div>
                </div>
                <div className={cx('history__card__hover__container__group__actions')}>
                    <div className={cx('history__card__hover__container__play')}>
                        <Button leftIcon={<RiPlayLargeLine style={{ marginRight: '5px' }} size={ESize.ICON - 7.5} strokeWidth={1} />} contentCenter>
                            <span>Play</span>
                            {overview_type === EMovieType.TV_SERIES && <span>&nbsp;E{episode_number}</span>}
                        </Button>
                    </div>
                    <div className={cx('history__card__hover__container__delete')}>
                        <Button
                            onClick={(e: any) => {
                                e.stopPropagation();
                                deleteHistory({ _id });
                            }}
                        >
                            <MdDelete size={ESize.ICON - 5} color={EColor.GREY_COLOR} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HCard;
