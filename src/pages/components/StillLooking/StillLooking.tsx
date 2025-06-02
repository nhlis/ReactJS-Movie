import React from 'react';
import classNames from 'classnames/bind';
import styles from './StillLooking.module.scss';
import { Button } from '../../../components/Button/Button';
import { data } from '../../../constants';
import { routes } from '../../../configs';

const cx = classNames.bind(styles);

export const StillLooking: React.FC = () => {
    return (
        <div className={cx('stillLooking')}>
            <div className={cx('stillLooking__img')}>
                <img src={`https://lh3.googleusercontent.com/d/${data.imgSrc.STILL_LOOKING}`} alt="" />
            </div>
            <div className={cx('stillLooking__title')}>
                <h4>Still looking for something to watch?</h4>
                <h4>Check out our full library</h4>
            </div>
            <div className={cx('stillLooking__actions')}>
                <Button className={cx('stillLooking__actions__btn')} outline to={routes.new}>
                    View All
                </Button>
            </div>
        </div>
    );
};
