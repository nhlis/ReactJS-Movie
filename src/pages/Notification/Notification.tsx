import React, { useEffect } from 'react';
import styles from '@/pages/Notification/Notification.module.scss';
import classNames from 'classnames/bind';
import { Empty } from '@/components/Empty/Empty';
import { data } from '@/constants';

const cx = classNames.bind(styles);

const Notification: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = 'A Project: Watch Popular Anime, Play Games & Shop Online';
    }, []);

    return (
        <div className={cx('notificationWrapper')}>
            <div className={cx('notificationContainer')}>
                <div className={cx('notificationContainer__header')}>
                    <h2>Notification Center</h2>
                </div>
                <div className={cx('notificationContainer__body')}>
                    <Empty img={data.imgSrc.EMPTY_NOTIFICATION} text={'We’ll send you a notification when we have something new to share!'} />
                </div>
            </div>
        </div>
    );
};

export default Notification;
