import { useRef, useState } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { BiBookmark, BiCaretDown, BiMenu } from 'react-icons/bi';
import { EColor, EMovieGenre, ESize } from '../../../enums';
import { Crown } from '../../../components/Assets/Crown';
import { GoArrowSwitch } from 'react-icons/go';
import { IoMdSettings } from 'react-icons/io';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdHistory, MdLogout } from 'react-icons/md';
import { TbGift } from 'react-icons/tb';
import { Button } from '../../../components/Button/Button';
import useAuthStore from '../../../stores/auth.store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../configs/routes/routes';
import usePreventScroll from '../../../hooks/usePreventScroll';
import { getSeason } from '../../../utils/get-season';
import { slugToString, stringToSlug } from '../../../utils/handle-slug';
import Logo from '../../../components/Assets/Logo';
import Avatar from '../../../components/Assets/Avatar';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { FaRegBookmark } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import { GrSearch } from 'react-icons/gr';
import { AuthenticationHref } from '../../../constants/authentication';
import AuthProvider from '../../../components/AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

export function Navbar() {
    const { genres } = useParams<{ genres: EMovieGenre }>();
    const [logoFillColor, setLogoFillColor] = useState(EColor.PRIMARY_COLOR);
    const navigate = useNavigate();
    const { is_login, list_account, authuser, profile } = useAuthStore();

    const { name, year } = getSeason();

    const [activeNavbarMobile, setactiveNavbarMobile] = useState<boolean>(false);
    const [activeGenre, setactiveGenre] = useState<boolean>(false);
    const [activeUserMenu, setactiveUserMenu] = useState<boolean>(false);

    const userMenuRef = useRef<HTMLDivElement>(null);
    const genreRef = useRef<HTMLDivElement>(null);
    const navbareRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    useClickOutside([userMenuRef, genreRef, navbareRef, hamburgerRef], () => {
        setactiveUserMenu(false);
        setactiveGenre(false);
        setactiveNavbarMobile(false);
    });

    usePreventScroll(activeNavbarMobile, `.${cx('header__navbar')}`);
    usePreventScroll(activeUserMenu, `.${cx('header__actions__item__authenticatedUser')}`);

    return (
        <>
            <div className={cx('overlay', { active: activeUserMenu || activeNavbarMobile || activeGenre })}></div>
            <div className={cx('header')}>
                <div ref={hamburgerRef} className={cx('header__hambuger', { active: activeNavbarMobile })}>
                    <Button
                        padding
                        onClick={() => {
                            setactiveNavbarMobile(!activeNavbarMobile);
                            setactiveUserMenu(false);
                            setactiveGenre(false);
                        }}
                    >
                        <BiMenu size={ESize.ICON} />
                    </Button>
                </div>
                <Link to={routes.home} onClick={() => setactiveNavbarMobile(false)}>
                    <div className={cx('header__logo')} onMouseEnter={() => setLogoFillColor(EColor.WHITE_COLOR)} onMouseLeave={() => setLogoFillColor(EColor.PRIMARY_COLOR)}>
                        <Logo className={cx('crunchyroll')} color={logoFillColor} width="25px" />
                    </div>
                </Link>
                <nav ref={navbareRef} className={cx('header__navbar', { active: activeNavbarMobile })} role="navigation" aria-label="Main Navigation">
                    <div className={cx('header__navbar__item')}>
                        <div className={cx('header__navbar__item__header')}>
                            <Button
                                to={routes.new}
                                onClick={() => {
                                    setactiveNavbarMobile(false);
                                    setactiveGenre(false);
                                }}
                                padding
                                className={cx('header__navbar__item__title')}
                            >
                                New
                            </Button>
                        </div>
                    </div>
                    <div className={cx('header__navbar__item')}>
                        <div className={cx('header__navbar__item__header')}>
                            <Button
                                to={routes.popular}
                                onClick={() => {
                                    setactiveGenre(false);
                                    setactiveNavbarMobile(false);
                                }}
                                padding
                                className={cx('header__navbar__item__title')}
                            >
                                Popular
                            </Button>
                        </div>
                    </div>

                    <div className={cx('header__navbar__item')}>
                        <div className={cx('header__navbar__item__header')}>
                            <Button
                                onClick={() => {
                                    setactiveGenre(false);
                                    setactiveNavbarMobile(false);
                                    navigate(routes.simulcastURL(stringToSlug(name + '-' + year)));
                                }}
                                padding
                                className={cx('header__navbar__item__title')}
                            >
                                Simulcast
                            </Button>
                        </div>
                    </div>
                    <div
                        ref={genreRef}
                        className={cx('header__navbar__item', { active: activeGenre })}
                        onClick={() => {
                            setactiveGenre(!activeGenre);
                            setactiveUserMenu(false);
                        }}
                    >
                        <div className={cx('header__navbar__item__header')}>
                            <Button padding marginIcon rightIcon={<BiCaretDown size={ESize.ICON - 3} />}>
                                Genres
                            </Button>
                        </div>
                        <ul className={cx('header__navbar__item__dropdown')}>
                            {Object.values(EMovieGenre).map((item, index) => (
                                <li
                                    className={cx('header__navbar__item__dropdown__item')}
                                    key={index}
                                    onClick={() => {
                                        setactiveUserMenu(false);
                                        setactiveNavbarMobile(false);
                                        navigate(routes.genreURL(item));
                                    }}
                                >
                                    <Button className={cx('header__navbar__item__dropdown__item__btn', { active: item === genres ? true : false })} padding>
                                        {slugToString(item)}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
                <ul className={cx('header__actions')}>
                    <li className={cx('header__actions__item')}>
                        {profile && profile.premium ? (
                            <>
                                <Button className={cx('cursor__default')} padding leftIcon={<Crown fill={EColor.PREMIUM_COLOR} width="22px" />} contentCenter>
                                    <div className={cx('header__actions__item__popup')}>
                                        <div className={cx('header__actions__item__popup__background')}>
                                            <div className={cx('header__actions__item__popup__backgroundInner')}>
                                                <svg className={cx('left__up__stars')} viewBox="0 0 50 36" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(2 -7)" fill={EColor.PRIMARY_COLOR} fillRule="evenodd">
                                                        <path stroke="#FAB818" strokeWidth="2" d="m15.225 33.094.214 1.078-.744.833 1.083-.215.853.733-.237-1.068.73-.855-1.068.24z"></path>
                                                        <path stroke="#FFF" strokeWidth="2" d="m6.602 16.97.24 1.124-.837.868 1.218-.224.96.764-.267-1.113.822-.891-1.202.25z"></path>
                                                        <path stroke="#FAB818" strokeWidth="2.4" d="m36.534 15.907.088 1.565-1.215 1.028 1.57-.09 1.059 1.205-.123-1.554 1.201-1.063-1.555.127z"></path>
                                                    </g>
                                                </svg>
                                                <svg className={cx('right__up__star')} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(-276 -10)" stroke="#FAB818" strokeWidth="2" fill={EColor.PRIMARY_COLOR} fillRule="evenodd">
                                                        <path d="m284.748 17.598.078.375-.273.28.396-.062.313.265-.087-.373.268-.287-.391.07z"></path>
                                                    </g>
                                                </svg>
                                                <svg className={cx('right__bottom__lines__star')} viewBox="0 0 75 79" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(-290 -89)" fill={EColor.PRIMARY_COLOR} fillRule="evenodd">
                                                        <path stroke="#FFC94D" strokeWidth="1.68" opacity=".688" d="m343.9 145.118.037.41-.31.28.412-.038.289.306-.047-.406.305-.29-.406.048z"></path>
                                                        <path stroke="#FAB818" opacity=".4" d="m365.957 85.043-52.5 82.059M361.457 173.102l-66-41.03"></path>
                                                    </g>
                                                </svg>
                                                <svg className={cx('left__bottom__lines')} viewBox="0 0 70 63" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(5 -105)" stroke="#FAB818" fill={EColor.PRIMARY_COLOR} fillRule="evenodd" opacity=".4">
                                                        <path d="M-43 73 93.876 192.954M-35.5 158.5l93.301-21.628"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={cx('header__actions__item__popup__content')}>
                                            <div className={cx('header__actions__item__popup__content__header')}>
                                                <Button to="/" padding marginIcon leftIcon={<Crown fill={EColor.PREMIUM_COLOR} width="22px" />}>
                                                    Uncensored Activated
                                                </Button>
                                            </div>
                                            <div className={cx('header__actions__item__popup__content__body')}>
                                                You're a Uncensored member! Enjoy ad-free streaming, early access to new episodes, and full HD quality across all your favorite anime.
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button disabled padding leftIcon={<Crown fill={EColor.PREMIUM_COLOR} width="22px" />} contentCenter>
                                    <div className={cx('header__actions__item__title')}>
                                        <div className={cx('header__actions__item__title__premium')}>
                                            <h5 style={{ color: EColor.SECONDARY_COLOR }}>Try Free</h5>
                                            <h5>Uncensored</h5>
                                        </div>
                                    </div>
                                    <div className={cx('header__actions__item__popup')}>
                                        <div className={cx('header__actions__item__popup__background')}>
                                            <div className={cx('header__actions__item__popup__backgroundInner')}>
                                                <svg className={cx('left__up__stars')} viewBox="0 0 50 36" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(2 -7)" fill={EColor.PRIMARY_COLOR} fillRule="evenodd">
                                                        <path stroke="#FAB818" strokeWidth="2" d="m15.225 33.094.214 1.078-.744.833 1.083-.215.853.733-.237-1.068.73-.855-1.068.24z"></path>
                                                        <path stroke="#FFF" strokeWidth="2" d="m6.602 16.97.24 1.124-.837.868 1.218-.224.96.764-.267-1.113.822-.891-1.202.25z"></path>
                                                        <path stroke="#FAB818" strokeWidth="2.4" d="m36.534 15.907.088 1.565-1.215 1.028 1.57-.09 1.059 1.205-.123-1.554 1.201-1.063-1.555.127z"></path>
                                                    </g>
                                                </svg>
                                                <svg className={cx('right__up__star')} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(-276 -10)" stroke="#FAB818" strokeWidth="2" fill={EColor.PRIMARY_COLOR} fillRule="evenodd">
                                                        <path d="m284.748 17.598.078.375-.273.28.396-.062.313.265-.087-.373.268-.287-.391.07z"></path>
                                                    </g>
                                                </svg>
                                                <svg className={cx('right__bottom__lines__star')} viewBox="0 0 75 79" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(-290 -89)" fill={EColor.PRIMARY_COLOR} fillRule="evenodd">
                                                        <path stroke="#FFC94D" strokeWidth="1.68" opacity=".688" d="m343.9 145.118.037.41-.31.28.412-.038.289.306-.047-.406.305-.29-.406.048z"></path>
                                                        <path stroke="#FAB818" opacity=".4" d="m365.957 85.043-52.5 82.059M361.457 173.102l-66-41.03"></path>
                                                    </g>
                                                </svg>
                                                <svg className={cx('left__bottom__lines')} viewBox="0 0 70 63" xmlns="http://www.w3.org/2000/svg" width={'100%'}>
                                                    <g transform="translate(5 -105)" stroke="#FAB818" fill={EColor.PRIMARY_COLOR} fillRule="evenodd" opacity=".4">
                                                        <path d="M-43 73 93.876 192.954M-35.5 158.5l93.301-21.628"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={cx('header__actions__item__popup__content')}>
                                            <div className={cx('header__actions__item__popup__content__header')}>
                                                <Button to="/" padding marginIcon leftIcon={<Crown fill={EColor.PREMIUM_COLOR} width="22px" />}>
                                                    7 - Day Free Trial
                                                </Button>
                                            </div>
                                            <div className={cx('header__actions__item__popup__content__body')}>
                                                Uncensored access includes unlimited anime, no ads, and new episodes shortly after they air in Japan. Try it now!
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </>
                        )}
                    </li>
                    <li className={cx('header__actions__item')}>
                        <Link to={routes.search} className={cx('header__actions__item__title')}>
                            <Button padding contentCenter className={cx('header__actions__item__icon')}>
                                <GrSearch size={ESize.ICON - 3} />
                            </Button>
                        </Link>
                    </li>
                    <li className={cx('header__actions__item', 'bookmark')}>
                        <AuthProvider>
                            <Link to={routes.bookmark} className={cx('header__actions__item__title')}>
                                <Button padding contentCenter className={cx('header__actions__item__icon')}>
                                    <FaRegBookmark size={ESize.ICON - 3} />
                                </Button>
                            </Link>
                        </AuthProvider>
                    </li>
                    <li className={cx('header__actions__item')}>
                        <div ref={userMenuRef} className={cx('header__actions__item')}>
                            {is_login ? (
                                <div
                                    className={cx('header__actions__item__authenticatedUser', { active: activeUserMenu })}
                                    onClick={() => {
                                        setactiveGenre(false);
                                        setactiveNavbarMobile(false);
                                        setactiveUserMenu(!activeUserMenu);
                                    }}
                                >
                                    <div className={cx('header__actions__item__authenticatedUser__title')}>
                                        <Avatar className={cx('avatar')} src={list_account[authuser ?? -1]?.img} width="30px" borderRadius="100%" />
                                        <span className={cx('header__actions__item__authenticatedUser__icon')}>
                                            <BiCaretDown size={ESize.ICON - 3} />
                                        </span>
                                    </div>
                                    <div className={cx('header__actions__item__authenticatedUser__menuScrollable', { active: activeUserMenu })}>
                                        <div className={cx('header__actions__item__authenticatedUser__menuSection')}>
                                            <Button to="/" padding className={cx('header__actions__item__authenticatedUser__menuSection__account')} contentCenter>
                                                <div className={cx('header__actions__item__authenticatedUser__menuSection__avatar')}>
                                                    <Avatar src={list_account[authuser ?? -1]?.img} width="50px" borderRadius="100%" marginLeft="0" marginRight="10px" />
                                                </div>
                                                <div className={cx('header__actions__item__authenticatedUser__menuSection__name')}>
                                                    <h4>{`${list_account[authuser ?? -1]?.first_name} ${list_account[authuser ?? -1]?.last_name || ''}`}</h4>
                                                </div>
                                                <div className={cx('header__actions__item__authenticatedUser__menuSection__icon')}>{/* <VscEdit size={ESize.ICON} /> */}</div>
                                            </Button>
                                            {profile && profile.premium ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <div className={cx('header__actions__item__authenticatedUser__menuSection__buttonContainer')}>
                                                        <Button disabled padding className={cx('header__actions__item__authenticatedUser__menuSection__button')} contentCenter>
                                                            <Crown fill={EColor.BLACK_COLOR} marginRight="10px" />
                                                            <span>7-Day Free Trial</span>
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className={cx('header__actions__item__authenticatedUser__menuSection')}>
                                            <Button
                                                padding
                                                className={cx('header__actions__item__authenticatedUser__menuSection__item')}
                                                leftIcon={<GoArrowSwitch size={ESize.ICON - 3} />}
                                                contentStart
                                                marginIcon
                                                to={routes.switch_profile}
                                            >
                                                Switch Profile
                                            </Button>
                                            <Button
                                                disabled
                                                padding
                                                className={cx('header__actions__item__authenticatedUser__menuSection__item')}
                                                marginIcon
                                                leftIcon={<IoMdSettings size={ESize.ICON - 3} />}
                                                contentStart
                                            >
                                                Settings
                                            </Button>
                                        </div>
                                        <div className={cx('header__actions__item__authenticatedUser__menuSection')}>
                                            <Button
                                                padding
                                                className={cx('header__actions__item__authenticatedUser__menuSection__item')}
                                                marginIcon
                                                leftIcon={<BiBookmark size={ESize.ICON - 3} />}
                                                contentStart
                                                to={routes.bookmark}
                                            >
                                                Bookmark
                                            </Button>
                                            <Button
                                                padding
                                                className={cx('header__actions__item__authenticatedUser__menuSection__item')}
                                                marginIcon
                                                leftIcon={<MdHistory size={ESize.ICON - 3} />}
                                                contentStart
                                                to={routes.history}
                                            >
                                                History
                                            </Button>
                                        </div>
                                        <div className={cx('header__actions__item__authenticatedUser__menuSection')}>
                                            <Button
                                                disabled
                                                padding
                                                className={cx('header__actions__item__authenticatedUser__menuSection__item')}
                                                marginIcon
                                                leftIcon={<IoNotificationsOutline size={ESize.ICON - 3} />}
                                                contentStart
                                                to={routes.notification}
                                            >
                                                Notifications
                                            </Button>
                                            <Button
                                                disabled
                                                padding
                                                className={cx('header__actions__item__authenticatedUser__menuSection__itemGift')}
                                                marginIcon
                                                leftIcon={<TbGift size={ESize.ICON - 3} />}
                                                contentStart
                                            >
                                                <div className={cx('header__actions__item__authenticatedUser__menuSection__itemGift__info')}>
                                                    <div>Gift Card</div>
                                                    <span className={cx('header__actions__item__authenticatedUser__menuSection__itemGift__description')}>Have a gift card? Redeem it here</span>
                                                </div>
                                            </Button>
                                        </div>
                                        <div className={cx('header__actions__item__authenticatedUser__menuSection')}>
                                            <Button
                                                padding
                                                href={AuthenticationHref.signout_accounts}
                                                className={cx('header__actions__item__authenticatedUser__menuSection__item')}
                                                marginIcon
                                                leftIcon={<MdLogout size={ESize.ICON - 3} />}
                                                contentStart
                                            >
                                                Log Out
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('header__actions__item__title')}>
                                    <AuthProvider>
                                        <Button padding className={cx('header__actions__item__icon')} href={AuthenticationHref.choose_accounts_auth}>
                                            <FaRegUser size={ESize.ICON - 3} />
                                        </Button>
                                    </AuthProvider>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('page')}></div>
        </>
    );
}
