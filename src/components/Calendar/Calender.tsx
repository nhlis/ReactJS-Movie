import React, { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import { CCard } from '../CCard/CCard';
import { GrFormNext } from 'react-icons/gr';
import { Button } from '../Button/Button';
import { BsPlayBtn } from 'react-icons/bs';
import { ESize } from '../../enums';
import { groupByDate } from '../../utils/group-date';
import { getFormattedDateStrings } from '../../utils/get-formatted-date-string';

const cx = classNames.bind(styles);

export const Calendar: React.FC<{
    episodes: Array<{ original_title: string; episode: number; isDub: boolean; premium: boolean; releaseDate: string; backdrop: string }>;
}> = ({ episodes }) => {
    const [showMore, setShowMore] = useState(false);
    const groupedEpisodes = useMemo(() => groupByDate(episodes), [episodes]);
    const { today, yesterdayStr, dayBeforeYesterdayStr } = useMemo(() => getFormattedDateStrings(), []);

    const filteredGroupedEpisodes = useMemo(
        () =>
            Object.keys(groupedEpisodes)
                .filter((date) => {
                    return date === today || date === yesterdayStr || (showMore && date === dayBeforeYesterdayStr);
                })
                .sort((a, b) => {
                    const dateA = new Date(a);
                    const dateB = new Date(b);

                    if (a === today) return -1;
                    if (b === today) return 1;
                    if (a === yesterdayStr) return -1;
                    if (b === yesterdayStr) return 1;

                    if (showMore && a === dayBeforeYesterdayStr) return 1;
                    if (showMore && b === dayBeforeYesterdayStr) return -1;

                    return dateB.getTime() - dateA.getTime();
                }),
        [groupedEpisodes, showMore, today, yesterdayStr, dayBeforeYesterdayStr]
    );

    const capitalizeFirstLetterOnly = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const formatDateLabel = (dateString: string) => {
        const locale = navigator.language;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const todayStr = today.toLocaleDateString(locale);
        const yesterdayStr = yesterday.toLocaleDateString(locale);

        if (dateString === todayStr) {
            return capitalizeFirstLetterOnly(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'day'));
        }
        if (dateString === yesterdayStr) {
            return capitalizeFirstLetterOnly(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-1, 'day'));
        }

        const [day, month, year] = dateString.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return capitalizeFirstLetterOnly(date.toLocaleDateString(locale, { weekday: 'long' }));
    };

    return (
        <div className={cx('calendarContainer')}>
            <div className={cx('calendarContainer__header')}>
                <div className={cx('calendarContainer__header__left')}>
                    <span className={cx('icon')}>
                        <BsPlayBtn size={ESize.ICON} />
                    </span>
                    <h2 className={cx('calendarContainer__title')}>New Episodes</h2>
                </div>
                <div className={cx('calendarContainer__header__right')}>
                    <Button disabled contentCenter rightIcon={<GrFormNext size={ESize.ICON} />}>
                        Release Calendar
                    </Button>
                </div>
            </div>
            <div className={cx('calendarContainer__body')}>
                {filteredGroupedEpisodes.map((date) => (
                    <div key={date} className={cx('calendarContainer__body__group')}>
                        <div className={cx('calendarContainer__body__header')}>
                            <h3 className={cx('calendarContainer__body__title')}>{formatDateLabel(date)}</h3>
                            <div className={cx('calendarContainer__body__drivier')}></div>
                        </div>
                        <div className={cx('calendarContainer__body__content')}>
                            {groupedEpisodes[date]
                                .sort((a: any, b: any) => {
                                    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
                                })
                                .map((episode: { original_title: string; episode: number; isDub: boolean; premium: boolean; releaseDate: string; backdrop: string }, index: number) => (
                                    <CCard
                                        original_title={episode.original_title}
                                        episode={episode.episode}
                                        isDub={episode.isDub}
                                        premium={episode.premium}
                                        releaseDate={episode.releaseDate}
                                        backdrop={episode.backdrop}
                                        key={index}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('calendarContainer__footer')}>
                <Button disabled={showMore} className={cx('calendarContainer__button')} onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'VIEW RELEASE CALENDAR' : 'SHOW MORE'}
                </Button>
            </div>
        </div>
    );
};
