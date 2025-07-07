import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/NCard/NCard.module.scss';

const cx = classNames.bind(styles);

export const NCard: React.FC<{ title: string; releaseDate: string; author: string; backdrop: string; large?: boolean }> = ({ title, releaseDate, author, backdrop, large = false }) => {
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className={cx('newsCard', { large })}>
            <div className={cx('newsCard__image')}>
                <img src={backdrop} alt="News Card" />
            </div>
            <div className={cx('newsCard__content')}>
                <h4 className={cx('newsCard__title')}>{title}</h4>
                <div className={cx('newsCard__episode')}>
                    <span>{formattedDate} GMT+0</span>
                </div>
                <div className={cx('newsCard__captions')}>
                    <span>by&nbsp;{author}</span>
                </div>
            </div>
        </div>
    );
};
