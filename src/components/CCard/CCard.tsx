import React from 'react';
import classNames from 'classnames/bind';
import styles from './CCard.module.scss';
import { IoPlayOutline } from 'react-icons/io5';
import { Crown } from '../Assets/Crown';
import { ESize } from '../../enums';

const cx = classNames.bind(styles);

export const CCard: React.FC<{ original_title: string; episode: number; isDub: boolean; premium: boolean; releaseDate: string; backdrop: string }> = ({
    original_title,
    episode,
    isDub,
    premium,
    releaseDate,
    backdrop,
}) => {
    const date = new Date(releaseDate);
    return (
        <div className={cx('calendarCard')}>
            <div className={cx('calendarCard__image')}>
                <img src={backdrop} alt="Calendar Card" />
                <div className={cx('calendarCard__image__playButton')}>
                    <IoPlayOutline size={ESize.ICON} />
                </div>
            </div>
            <div className={cx('calendarCard__content')}>
                <div className={cx('calendarCard__content__header')}>
                    <h4 className={cx('calendarCard__title')}>{original_title}</h4>
                    <div className={cx('calendarCard__episode')}>
                        {premium && <Crown width="12px" marginRight="10px" />}
                        <span>Episode&nbsp;{episode}</span>
                    </div>
                </div>
                <div className={cx('calendarCard__content__detail')}>
                    <div className={cx('calendarCard__captions')}>{isDub ? <span className={cx('dot')}>Sub&nbsp;&#124;&nbsp;Dub</span> : <span className={cx('dot')}>Subtitled</span>}</div>
                    <div className={cx('calendarCard__captions__munites')}>
                        {date.getHours()}:{String(date.getMinutes()).padStart(2, '0')}
                    </div>
                </div>
            </div>
        </div>
    );
};
