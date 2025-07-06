import React from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Modal from '../../components/Modal/Modal';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

const cx = classNames.bind(styles);

function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <Modal />
            <Navbar />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Main;
