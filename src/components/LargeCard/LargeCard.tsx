import React from 'react';
import classNames from 'classnames/bind';
import styles from './LargeCard.module.scss';
import BCard from '../BCard/BCard';
import { IOverviewResponse } from '../../interfaces/overview.interface';

const cx = classNames.bind(styles);

export const LargeCard: React.FC<{ overviews: Array<IOverviewResponse> }> = ({ overviews }) => {
    return (
        <div className={cx('largeCard__container')}>
            {overviews.map((overview: IOverviewResponse, index: number) => (
                <BCard
                    key={index}
                    _id={overview._id}
                    original_title={overview.original_title}
                    description={overview.description}
                    subtitle_languages={overview.subtitle_languages}
                    dub_languages={overview.dub_languages}
                    backdrop={overview.backdrop}
                    is_bookmark={overview.is_bookmark}
                />
            ))}
        </div>
    );
};
