import React from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

export const Banner: React.FC<{ src: string }> = ({ src }) => {
    return (
        <div className={cx('banner')}>
            <img src={src} alt="" />
        </div>
    );
};
