import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { Button } from '../../../components/Button/Button';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Crown } from '../../../components/Assets/Crown';
import { EColor } from '../../../enums';
import { data } from '../../../constants';
import { routes } from '../../../configs';
import AuthProvider from '../../../components/AuthProvider/AuthProvider';

const cx = classNames.bind(styles);

export function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footerWrapper')}>
                <div className={cx('sections')}>
                    <div className={cx('footer__section')}>
                        <h4 className={cx('footer__section__title')}>Navigation</h4>
                        <ul className={cx('footer__section__list')}>
                            <li className={cx('footer__section__list__item')}>
                                <Button text contentCenter to={routes.home}>
                                    Home
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text contentCenter to={routes.new}>
                                    New
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text to={routes.popular}>
                                    Popular
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text to={routes.simulcast}>
                                    Simulcast
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer__section')}>
                        <h4 className={cx('footer__section__title')}>Connect with Us</h4>
                        <ul className={cx('footer__section__list')}>
                            <li className={cx('footer__section__list__item')}>
                                <Button text leftIcon={<FaYoutube />} marginIcon>
                                    Youtube
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text leftIcon={<FaFacebook />} marginIcon>
                                    Facebook
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text leftIcon={<FaTwitter />} marginIcon>
                                    Twitter
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text leftIcon={<FaInstagram />} marginIcon>
                                    Instagram
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text leftIcon={<FaTiktok />} marginIcon>
                                    TikTok
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer__section')}>
                        <h4 className={cx('footer__section__title')}>A Project</h4>
                        <ul className={cx('footer__section__list')}>
                            <li className={cx('footer__section__list__item')}>
                                <Button text leftIcon={<Crown width={`1em`} />} marginIcon>
                                    <span style={{ color: EColor.SECONDARY_COLOR }}> Start a Free Trial</span>
                                </Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>About</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Help Center</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Terms of use</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Privacy Policy</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>AdChoices</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Do Not Sell or Share My Personal Infomation</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Cookie Consent Tool</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Press Inquiries</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Get the App</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Redeem Gift Card</Button>
                            </li>
                            <li className={cx('footer__section__list__item')}>
                                <Button text>Jobs</Button>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer__section')}>
                        <h4 className={cx('footer__section__title')}>Account</h4>
                        <AuthProvider>
                            <ul className={cx('footer__section__list')}>
                                <li className={cx('footer__section__list__item')}>
                                    <Button text to={routes.switch_profile}>
                                        Switch Profile
                                    </Button>
                                </li>
                                <li className={cx('footer__section__list__item')}>
                                    <Button text to={routes.bookmark}>
                                        Bookmark
                                    </Button>
                                </li>
                                <li className={cx('footer__section__list__item')}>
                                    <Button text to={routes.history}>
                                        History
                                    </Button>
                                </li>
                                <li className={cx('footer__section__list__item')}>
                                    <Button text>My Account</Button>
                                </li>
                                <li className={cx('footer__section__list__item')}>
                                    <Button text href={data.AuthenticationHref.signout_accounts}>
                                        Log Out
                                    </Button>
                                </li>
                            </ul>
                        </AuthProvider>
                    </div>
                </div>
            </div>
            <div className={cx('footerCoppyright')}>
                <div className={cx('footerCoppyright__legal')}>
                    <img className={cx('footerCoppyright__legal__img')} src={`https://lh3.googleusercontent.com/d/${data.imgSrc.LOGO}`} alt="" />
                    <p className={cx('footerCoppyright__legal__text')}>© A Project, LLC</p>
                </div>
                <div className={cx('footerCoppyright__dropdownLanguages')}>
                    <Button>ENGLISH</Button>
                </div>
            </div>
        </div>
    );
}
