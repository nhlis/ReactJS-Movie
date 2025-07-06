import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Button } from '../../components/Button/Button';
import { MdOutlineClose } from 'react-icons/md';
import { ESize } from '../../enums';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { PCard } from '../../components/PCard/PCard';
import { Empty } from '../../components/Empty/Empty';
import { routes } from '../../configs';
import { useQuery } from '@tanstack/react-query';
import { OverviewService } from '../../services/overview.service';
import { IOverviewResponse } from '../../interfaces/overview.interface';
import { data } from '../../constants';
import { SearchService } from '../../services/search.service';
import useAuthStore from '../../stores/auth.store';
import { IResponeSeachHistory } from '../../interfaces/search-history.interface';
import useMutationSearchHistory from '../../hooks/useMutationSearchHistory';

const cx = classNames.bind(styles);

function Search() {
    const [keyword, setKeyword] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const { authuser } = useAuthStore();

    const keywordDebounce = useDebounce(keyword, 500);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = 'A Project: Watch Popular Anime';
        if (inputRef) inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');
        if (query) {
            setKeyword(query);
        }
    }, [location]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (keywordDebounce.trim().length > 0) {
            params.set('q', keywordDebounce);
        } else {
            params.delete('q');
        }
        navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }, [keywordDebounce, location.pathname, location.search, navigate]);

    const { data: dataOverviews, isLoading } = useQuery({
        queryKey: ['overviews', 'search', keywordDebounce],
        queryFn: () => OverviewService.searchOverviews(keywordDebounce),
        enabled: keywordDebounce.length > 0,
    });

    const { data: dataSearchHistories } = useQuery({ queryKey: ['search-histories'], queryFn: SearchService.getSearchHistories, enabled: authuser !== undefined });

    const { postSearchHistory, deleteSearchHistories } = useMutationSearchHistory();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeyword(value);
    };

    return (
        <div className={cx('searchWrapper')}>
            <div className={cx('searchField')}>
                <div className={cx('searchField__container')}>
                    <div className={cx('searchField__input')}>
                        <input type="text" placeholder="Search..." value={keyword} onChange={handleSearchChange} ref={inputRef} />
                        <div className={cx('searchField__input__action')}>
                            {keyword.length > 0 && (
                                <Button
                                    contentCenter
                                    onClick={() => {
                                        setKeyword('');
                                    }}
                                >
                                    <MdOutlineClose size={ESize.ICON} />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('searchResult')}>
                {!isLoading && dataOverviews && dataOverviews.overviews.length <= 0 && keywordDebounce?.length > 0 ? (
                    <div className={cx('searchResult__emty')}>
                        <Empty img={`https://lh3.googleusercontent.com/d/${data.imgSrc.EMPTY_SEARCH}`} text="Sorry, no results were found. Check your spelling or try searching for something else." />
                    </div>
                ) : (
                    <div className={cx('searchResult__content')}>
                        {keywordDebounce?.length > 0 ? (
                            <div className={cx('searchResult__content__group')}>
                                <div className={cx('searchResult__content__group__header')}>
                                    <h3 className={cx('searchResult__content__title')}>Top Results</h3>
                                </div>
                                <div className={cx('searchResult__content__list')}>
                                    {dataOverviews &&
                                        dataOverviews.overviews.map((card: IOverviewResponse, index) => (
                                            <div
                                                onClick={() => {
                                                    if (authuser !== undefined) {
                                                        postSearchHistory({ overview_id: card._id });
                                                    }
                                                }}
                                                key={index}
                                            >
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
                                                    useBackdrop
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {dataSearchHistories && dataSearchHistories.search_histories.length > 0 ? (
                                    <div className={cx('searchResult__content__group')}>
                                        <div
                                            className={cx('searchResult__content__group__header')}
                                            onClick={() => {
                                                if (authuser !== undefined) {
                                                    deleteSearchHistories({ overview_ids: dataSearchHistories.search_histories.map((s) => s.overview_id) });
                                                }
                                            }}
                                        >
                                            <h3 className={cx('searchResult__content__title')}>Recent Search Results</h3>
                                            <Button className={cx('searchResult__content__action')}>Clear Recent</Button>
                                        </div>
                                        <div className={cx('searchResult__content__recent')}>
                                            <ul className={cx('searchResult__content__recent__list')}>
                                                {dataSearchHistories.search_histories.map((search_history: IResponeSeachHistory, index) => (
                                                    <li className={cx('searchResult__content__recent__list__item')} key={index}>
                                                        <Button
                                                            onClick={() => {
                                                                if (authuser !== undefined) {
                                                                    postSearchHistory({ overview_id: search_history.overview_id });
                                                                }
                                                            }}
                                                            to={routes.overviewURL(search_history.overview_id, search_history.original_title)}
                                                            contentCenter
                                                        >
                                                            {search_history.original_title}
                                                        </Button>
                                                        <Button
                                                            contentCenter
                                                            onClick={() => {
                                                                if (authuser !== undefined) {
                                                                    deleteSearchHistories({ overview_ids: [search_history.overview_id] });
                                                                }
                                                            }}
                                                        >
                                                            <MdOutlineClose size={ESize.ICON} />
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
