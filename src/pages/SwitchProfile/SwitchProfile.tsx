import classNames from 'classnames/bind';
import styles from './SwitchProfile.module.scss';
import { data } from '../../constants';
import useAuthStore from '../../stores/auth.store';
import Avatar from '../../components/Assets/Avatar';
import { EAuthState, EColor } from '../../enums';
import { useNavigate } from 'react-router';
import { routes } from '../../configs';
import { Button } from '../../components/Button/Button';
import Logo from '../../components/Assets/Logo';
import { AuthenticationHref } from '../../constants/authentication';

const cx = classNames.bind(styles);

function SwitchProfile() {
    const { list_account, setAuthStore } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className={cx('switch_profile__wrapper')}>
            <div className={cx('switch_profile__container')}>
                <figure className={cx('switch_profile__background')}>
                    <img src={data.imgSrc.BACKGROUND} alt="" />
                </figure>
                <div className={cx('switch_profile__content')}>
                    <div className={cx('switch_profile__content__container')}>
                        <div className={cx('switch_profile__title')}>
                            <h1>Who's going on an adventure?</h1>
                        </div>
                        <div className={cx('switch_profile__accounts')}>
                            {list_account
                                .filter((acc) => acc.state === EAuthState.SIGNED_IN)
                                .map((acc, index) => (
                                    <div
                                        key={index}
                                        className={cx('switch_profile__account')}
                                        onClick={() => {
                                            setAuthStore((prev) => ({
                                                ...prev,
                                                authuser: acc.authuser,
                                            }));
                                            navigate(routes.home);
                                        }}
                                    >
                                        <Avatar className={cx('switch_profile__account__avatar')} src={acc.img} width="5em" borderRadius="100%" />
                                        <h4 className={cx('switch_profile__account__name')}>
                                            <span>{acc.first_name}</span>&nbsp;
                                            <span>{acc.last_name}</span>
                                        </h4>
                                    </div>
                                ))}
                        </div>
                        <div className={cx('switch_profile__authentication__signin')}>
                            <h4 className={cx('switch_profile__authentication__signin__title')}>Add new</h4>
                            <div className={cx('switch_profile__authentication__actions')}>
                                <Button className={cx('switch_profile__authentication__actions__btn__auth')} href={AuthenticationHref.choose_accounts_auth}>
                                    <Logo color={EColor.WHITE_COLOR} width="30px" />
                                </Button>
                                <Button className={cx('switch_profile__authentication__actions__btn__oauth2')} href={AuthenticationHref.select_accounts_oauth2}>
                                    <Logo color={EColor.WHITE_COLOR} width="30px" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SwitchProfile;
