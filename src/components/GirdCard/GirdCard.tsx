import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from '@/components/GirdCard/GirdCard.module.scss';

const cx = classNames.bind(styles);

export function GirdCard({ children, lagre = false }: { children: ReactNode; lagre?: boolean }) {
    return <div className={cx('girdCardContainer', { lagre })}>{children}</div>;
}
