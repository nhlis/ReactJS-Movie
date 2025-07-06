import classNames from 'classnames/bind';
import { Link, useLocation, useMatch, useNavigate } from 'react-router';

import styles from './BrowserDropdown.module.scss';
import { getSeason } from '../../utils/get-season';
import { routes } from '../../configs';
import { stringToSlug } from '../../utils/handle-slug';
import React from 'react';

const cx = classNames.bind(styles);

// Component con cho Dropdown Browse
function BrowseDropdown({ isActive }: { isActive: boolean }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, year } = getSeason();

    const matchSimulcast = !!useMatch('/simulcast/:season');

    if (!isActive) return null;

    return (
        <div className={cx('browser__dropdown__container')}>
            <div className={cx('browser__dropdown__container__scrollable')}>
                <Link to={routes.new}>
                    <div
                        className={cx('browser__dropdown__container__item', {
                            active: location.pathname === routes.new,
                        })}
                    >
                        Newest
                    </div>
                </Link>
                <Link to={routes.popular}>
                    <div
                        className={cx('browser__dropdown__container__item', {
                            active: location.pathname === routes.popular,
                        })}
                    >
                        Popularity
                    </div>
                </Link>
                <div
                    className={cx('browser__dropdown__container__item', {
                        active: matchSimulcast,
                    })}
                    onClick={() => navigate(routes.simulcastURL(stringToSlug(`${name}-${year}`)))}
                >
                    Simulcast
                </div>
            </div>
        </div>
    );
}

export default React.memo(BrowseDropdown);
