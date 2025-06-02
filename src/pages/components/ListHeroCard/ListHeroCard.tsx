import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

import styles from './ListHeroCard.module.scss';
import { PCard } from '../../../components/PCard/PCard';
import { HeroCard } from '../../../components/Hero-Card/Hero-Card';
import { IOverviewResponse } from '../../../interfaces/overview.interface';

export const ListHeroCard: React.FC<{
    title: string;
    description?: string;
    cards: Array<IOverviewResponse>;
}> = ({ title, description, cards }) => {
    return (
        <div className={cx('listContainer')}>
            <header className={cx('listHeader')}>
                <h2 className={cx('listTitle')}>{title}</h2>
                {description && <p className={cx('listDescription')}>{description}</p>}
            </header>
            <div className={cx('listContainer__heroCard')}>
                <HeroCard spaceBetween={10}>
                    {cards.map((card: IOverviewResponse) => (
                        <div key={card._id} className={cx('heroCard__slide')}>
                            <PCard
                                _id={card._id}
                                original_title={card.original_title}
                                description={card.description}
                                subtitle_languages={card.subtitle_languages}
                                dub_languages={card.dub_languages}
                                type={card.type}
                                poster={card.poster}
                                backdrop={card.backdrop}
                                count_season={card.count_season}
                                count_episode={card.count_episode}
                                average_rating={card.average_rating}
                                count_rating={card.count_rating}
                                is_bookmark={card.is_bookmark ?? false}
                            />
                        </div>
                    ))}
                </HeroCard>
            </div>
        </div>
    );
};
