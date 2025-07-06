import styles from './News.module.scss';
import classNames from 'classnames/bind';
import { NCard } from '../../../components/NCard/NCard';
import { Button } from '../../../components/Button/Button';
import { GrFormNext } from 'react-icons/gr';
import { EColor, ESize } from '../../../enums';
import { data } from '../../../constants';
import Notification from '../../../components/Assets/Notification';

const cx = classNames.bind(styles);

export function News({ news }: { news: Array<{ title: string; releaseDate: string; author: string; backdrop: string }> }) {
    return (
        <div className={cx('news')}>
            <div className={cx('newsBackground')}>
                <svg xmlns="http://www.w3.org/2000/svg" className={cx('newsBackground__svg')} viewBox="0 0 2714 1029" aria-hidden="true" role="img" width={'100%'} height={'100%'}>
                    <defs>
                        <linearGradient id="news-and-editorial-blue-a" x1="-78.772125%" x2="77.533411%" y1="68.933319%" y2="68.933319%">
                            <stop offset="0" stopColor="#2abdbb" stopOpacity="0"></stop>
                            <stop offset="1" stopColor="#2abdbb"></stop>
                        </linearGradient>
                        <linearGradient id="news-and-editorial-blue-b" x1="90.363425%" x2="33.811005%" y1="39.107689%" y2="82.867248%">
                            <stop offset="0" stopColor="#269495" stopOpacity=".4"></stop>
                            <stop offset="1" stopColor="#269495"></stop>
                        </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <path
                            d="m0 756.312326c788.339995 0 1338.16992-310.929357 1688.88392-756.312326h1024.8272c-574.94747 640.943454-1505.63179 1086.14556-2713.71112 756.312326z"
                            fill="url(#news-and-editorial-blue-a)"
                        ></path>
                        <circle cx="1571" cy="653.965777" fill="url(#news-and-editorial-blue-b)" fillOpacity=".4" r="374"></circle>
                    </g>
                </svg>
                <div className={cx('newsBackground__img')}>
                    <img className={cx('newsBackground__img__hime')} src={`https://lh3.googleusercontent.com/d/${data.imgSrc.NEWS_HIME}`} alt="" />
                    <img className={cx('newsBackground__img__yuzu')} src={`https://lh3.googleusercontent.com/d/${data.imgSrc.NEWS_YUZU}`} alt="" />
                </div>
            </div>
            <div className={cx('newsContent__container')}>
                <div className={cx('newsContent__header')}>
                    <Button className={cx('newsContent__header__title')} marginIcon leftIcon={<Notification fill={EColor.WHITE_COLOR} />}>
                        A Project News
                    </Button>
                    <Button disabled className={cx('newsContent__header__btn')} marginIcon contentCenter rightIcon={<GrFormNext size={ESize.ICON} />}>
                        View all
                    </Button>
                </div>
                <div className={cx('newsContent')}>
                    <div className={cx('newsContent__topNews')}>
                        <h4 className={cx('newsContent__topNews__header')}>Top News</h4>
                        <div className={cx('newsContent__topNews__content')}>
                            {news.slice(0, 2).map((n: { title: string; releaseDate: string; author: string; backdrop: string }, index) => {
                                return <NCard title={n.title} releaseDate={n.releaseDate} author={n.author} backdrop={n.backdrop} large key={index} />;
                            })}
                        </div>
                    </div>
                    <div className={cx('newsContent__lastedNews')}>
                        <h4 className={cx('newsContent__lastedNews__header')}>Latest</h4>
                        <div className={cx('newsContent__lastedNews__content')}>
                            {news.map((n: { title: string; releaseDate: string; author: string; backdrop: string }, index) => {
                                return <NCard title={n.title} releaseDate={n.releaseDate} author={n.author} backdrop={n.backdrop} key={index} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
