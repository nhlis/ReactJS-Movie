import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/Empty/Empty.module.scss';

const cx = classNames.bind(styles);

export const Empty: React.FC<{ img: string; text: string }> = ({ img, text }) => {
    return (
        <div className={cx('emptyContainer')}>
            <img src={img} alt="" loading='lazy'/>
            <p>{text}</p>
        </div>
    );
};
