import classNames from 'classnames/bind';

import styles from '@/components/FilterDropdown/FilterDropdown.module.scss';

const cx = classNames.bind(styles);

// Component con cho Dropdown Filter
function FilterDropdown({
    isActive,
    filters,
    onFilterChange,
}: {
    isActive: boolean;
    filters: {
        language: string;
        media: string;
    };
    onFilterChange: (key: keyof typeof filters, value: string) => void;
}) {
    if (!isActive) return null;

    const languages = [
        { label: 'All', value: 'all' },
        { label: 'Subtitle', value: 'subtitle' },
        { label: 'Dubtitle', value: 'dub' },
    ];

    const medias = [
        { label: 'All', value: 'all' },
        { label: 'TV Series', value: 'series' },
        { label: 'Movies', value: 'movie' },
    ];

    return (
        <div className={cx('filter__dropdown__container')}>
            <div className={cx('filter__dropdown__container__scrollable')}>
                {/* Language Filter */}
                <div className={cx('filter__dropdown__container__group')}>
                    <span className={cx('filter__dropdown__container__title')}>Language</span>
                    <ul>
                        {languages.map((lang) => (
                            <li key={lang.value} className={cx('filter__dropdown__container__item')} onClick={() => onFilterChange('language', lang.value)}>
                                <input id={`lang-${lang.value}`} type="radio" name="language" value={lang.value} checked={filters.language === lang.value} readOnly />
                                <label htmlFor={`lang-${lang.value}`} className={cx({ active: filters.language === lang.value })}>
                                    {lang.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Media Filter */}
                <div className={cx('filter__dropdown__container__group')}>
                    <span className={cx('filter__dropdown__container__title')}>Media</span>
                    <ul>
                        {medias.map((media) => (
                            <li key={media.value} className={cx('filter__dropdown__container__item')} onClick={() => onFilterChange('media', media.value)}>
                                <input id={`media-${media.value}`} type="radio" name="media" value={media.value} checked={filters.media === media.value} readOnly />
                                <label htmlFor={`media-${media.value}`} className={cx({ active: filters.media === media.value })}>
                                    {media.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FilterDropdown;
