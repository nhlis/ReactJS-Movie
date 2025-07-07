import styles from '@/components/Modal/Modal.module.scss';
import classNames from 'classnames/bind';
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';
import useAuthStore from '@/stores/auth.store';
import { EColor, ESize } from '@/enums';
import { Button } from '@/components/Button/Button';
import { data } from '@/constants';

const cx = classNames.bind(styles);

function Modal() {
    const { setAuthStore, is_modal } = useAuthStore();

    useEffect(() => {
        if (is_modal) {
            document.body.classList.add('prevent__scroll');
        } else {
            document.body.classList.remove('prevent__scroll');
        }

        return () => {
            document.body.classList.remove('prevent__scroll');
        };
    }, [is_modal]);

    if (!is_modal) return null;

    return (
        <div className={cx('modal__wrapper')}>
            <div className={cx('modal__container')}>
                <div className={cx('modal__container__content')}>
                    <div
                        className={cx('modal__close')}
                        onClick={() => {
                            setAuthStore({ is_modal: false });
                        }}
                    >
                        <IoClose size={ESize.ICON + 5} color={EColor.WHITE_COLOR} />
                    </div>
                    <div className={cx('modal__img')}>
                        <img src={data.imgSrc.POPUP_HIME} alt="" loading="lazy" />
                    </div>

                    <div className={cx('modal__content')}>
                        <h4 className={cx('modal__content__title')}>Sign in now</h4>
                        <span className={cx('modal__content__desciption')}>
                            Sign in to add shows and movies to your watchlist, customize your preferences, and more! New here? Create a A Project account.
                        </span>
                    </div>

                    <div className={cx('modal__action')}>
                        <Button
                            className={cx('modal__btn')}
                            primary
                            padding
                            href={data.AuthenticationHref.choose_accounts_auth}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
