import classNames from 'classnames/bind';
import styles from '@/components/BCard/BCard.module.scss';
import { Button } from '@/components/Button/Button';
import { EColor, ESize } from '@/enums';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { routes } from '@/configs/routes/routes';
import useMutationBookmark from '@/hooks/useMutationBookmark';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

function BCard({
    _id,
    original_title,
    description,
    subtitle_languages,
    dub_languages,
    backdrop,
    is_bookmark = false,
}: {
    _id: string;
    original_title: string;
    description: string;
    subtitle_languages: Array<string>;
    dub_languages: Array<string>;
    backdrop: string;
    is_bookmark?: boolean;
}) {
    const { localBookmark, handleBookmarkClick } = useMutationBookmark(is_bookmark, _id);

    return (
        <div className={cx('backdropCard')}>
            <div className={cx('backdropCard__image')}>
                <img srcSet={`${backdrop}=s500 500w, ${backdrop}=s600 600w`} sizes="(max-width: 992px) 500px, (max-width: 1280px) 600px, 800px" src={`${backdrop}=s700`} alt="Backdrop Card" />
            </div>
            <div className={cx('backdropCard__content')}>
                <h4 className={cx('backdropCard__title')}>{original_title}</h4>
                <div className={cx('backdropCard__languages')}>
                    {subtitle_languages.length > 0 && dub_languages.length > 0 ? (
                        <span className={cx('dot')}>Sub | Dub</span>
                    ) : subtitle_languages.length > 0 ? (
                        <span className={cx('dot')}>Subtitled</span>
                    ) : dub_languages.length > 0 ? (
                        <span className={cx('dot')}>Dubtitled</span>
                    ) : (
                        <span className={cx('dot')}>Raw</span>
                    )}
                    <AuthProvider>
                        {localBookmark ? (
                            <Button
                                className={cx('backdropCard__languages__bookmark')}
                                contentCenter
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleBookmarkClick();
                                }}
                            >
                                <FaBookmark size={ESize.ICON} color={EColor.PRIMARY_COLOR} />
                            </Button>
                        ) : (
                            <Button
                                className={cx('backdropCard__languages__bookmark')}
                                contentCenter
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleBookmarkClick();
                                }}
                            >
                                <FaRegBookmark size={ESize.ICON} color={EColor.PRIMARY_COLOR} />
                            </Button>
                        )}
                    </AuthProvider>
                </div>
                <div className={cx('backdropCard__description')}>
                    <span>{description}</span>
                </div>
                <div className={cx('backdropCard__actions')}>
                    <Button to={routes.overviewURL(_id, original_title)} className={cx('backdropCard__actions__buttons__play')} padding primary contentCenter>
                        <span>Show Info & Episodes</span>
                    </Button>
                    <AuthProvider>
                        {localBookmark ? (
                            <Button
                                className={cx('backdropCard__actions__buttons__bookmark')}
                                padding
                                outline
                                contentCenter
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleBookmarkClick();
                                }}
                            >
                                <FaBookmark style={{ marginRight: '10px' }} size={ESize.ICON - 7} color={EColor.PRIMARY_COLOR} />
                                <span> Remove to Watchlist</span>
                            </Button>
                        ) : (
                            <Button
                                className={cx('backdropCard__actions__buttons__bookmark')}
                                padding
                                outline
                                contentCenter
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleBookmarkClick();
                                }}
                            >
                                <FaRegBookmark style={{ marginRight: '10px' }} size={ESize.ICON - 7} color={EColor.PRIMARY_COLOR} />
                                Add to Watchlist
                            </Button>
                        )}
                    </AuthProvider>
                </div>
            </div>
        </div>
    );
}

export default BCard;
