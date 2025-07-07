import React from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import useAuthStore from '@/stores/auth.store';

import styles from '@/layouts/Authentication/Authentication.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AuthThentication({ children }: { children: React.ReactNode }) {
    useAuthSession();

    const { is_fetched } = useAuthStore();

    if (!is_fetched) {
        return (
            <div className={cx('authentication__wrapper')}>
                <div className={cx('spinner')}></div>
            </div>
        );
    } else {
        return <div>{children}</div>;
    }
}

export default AuthThentication;
