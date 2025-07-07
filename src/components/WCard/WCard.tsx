import React, { useEffect } from 'react';
import styles from '@/components/WCard/WCard.module.scss';
import classNames from 'classnames/bind';
import { Crown } from '@/components/Assets/Crown';
import { useNavigate, useParams } from 'react-router';
import { routes } from '@/configs';

const cx = classNames.bind(styles);

export const WCard: React.FC<{
    _id: string;
    title: string;
    episodeNumber: number;
    subtitle_languages: string[];
    dub_languages: string[];
    premium: boolean;
    img: string;
}> = ({ _id, title, dub_languages, episodeNumber, img, premium, subtitle_languages }) => {
    const { overviewWithId } = useParams<{ overviewWithId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!overviewWithId) navigate(-1);
    }, [overviewWithId, navigate]);

    const [overview_slug, overview_id] = overviewWithId!.split(/-(?=\d+$)/);

    return (
        <div className={cx('wCard')} onClick={() => navigate(routes.watchURL(overview_id, _id, overview_slug, title))}>
            <div className={cx('wCard__image')}>
                <img src={`${img}=s400`} alt="Calendar Card" />
                {premium && (
                    <div className={cx('episodeCard__premium')}>
                        <Crown width="0.75em" />
                        <span>Uncensored</span>
                    </div>
                )}
                <div className={cx('episodeCard__duration')}>{'22'}m</div>
            </div>
            <div className={cx('wCard__content')}>
                <h4 className={cx('wCard__content__title')}>
                    <span>E{episodeNumber}</span>&nbsp;&#45;&nbsp;
                    <span>{title}</span>
                </h4>
                <div className={cx('wCard__content__captions')}>
                    {subtitle_languages.length > 0 && dub_languages.length > 0 ? <span className={cx('dot')}>Sub&nbsp;&#124;&nbsp;Dub</span> : <span className={cx('dot')}>Subtitled</span>}
                </div>
            </div>
        </div>
    );
};
