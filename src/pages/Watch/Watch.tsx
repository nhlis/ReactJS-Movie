import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Watch.module.scss';
import { FaStar } from 'react-icons/fa';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Button } from '../../components/Button/Button';
import { EAgeRating, EColor, EMovieType, EReactionType, ESize } from '../../enums';
import { AgeRating14, AgeRating16 } from '../../components/Assets/AgeRating';
import { GrShareOption } from 'react-icons/gr';
import { WCard } from '../../components/WCard/WCard';
import { ListComment } from '../components/ListComment/ListComment';
import { getFingerprintId } from '../../utils/finger-print';
import { useNavigate, useParams } from 'react-router-dom';
import { OverviewService } from '../../services/overview.service';
import { useQuery } from '@tanstack/react-query';
import { EpisodeService } from '../../services/episode.service';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import useMutationBookmark from '../../hooks/useMutationBookmark';
import useMutationReaction from '../../hooks/useMutationReaction';
import { ReactionService } from '../../services/reaction.service';
import { routes } from '../../configs';
import useMutationHistory from '../../hooks/useMutationHistory';
import useMutationView from '../../hooks/useMutationView';
import AuthProvider from '../../components/AuthProvider/AuthProvider';
import useAuthStore from '../../stores/auth.store';

const cx = classNames.bind(styles);

function Watch() {
    const { overviewWithId, episodeWithId } = useParams<{ overviewWithId: string; episodeWithId: string }>();
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState<boolean>(false);
    const { profile } = useAuthStore();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!overviewWithId || !episodeWithId) navigate(-1);
    }, [overviewWithId, episodeWithId, navigate]);

    const [, overview_id] = overviewWithId!.split(/-(?=\d+$)/);
    const [, episode_id] = episodeWithId!.split(/-(?=\d+$)/);

    const { data: dataOverviews, isLoading: isLoadingOverview } = useQuery({
        queryKey: ['overview', overview_id],
        queryFn: () => OverviewService.getOverviewsByIds([overview_id!]),
        enabled: !!overview_id,
    });

    const { data: episodeContext, isLoading: isLoadingEpisode } = useQuery({
        queryKey: ['episodes', 'context', episode_id],
        queryFn: () => EpisodeService.getEpisodeInContext(episode_id),
        enabled: !!overview_id,
    });

    const isPremiumEpisode = episodeContext?.current?.premium === true;
    const isUserPremium = profile?.premium === true;

    const canAccess = !isPremiumEpisode || isUserPremium;

    const { data: dataURI, isLoading: isLoadingEpisodeURI } = useQuery({
        queryKey: ['episode', 'uri', episode_id],
        queryFn: () => EpisodeService.getURIEpisode(episode_id),
        enabled: !!overview_id && !!episode_id && episodeContext?.current !== undefined && canAccess,
        staleTime: 0,
        gcTime: 0,
    });

    const overview = dataOverviews?.overviews?.[0];

    const { localBookmark, handleBookmarkClick } = useMutationBookmark(overview?.is_bookmark ?? false, overview?._id ?? '');

    const { localReaction: localLike, handleReactionClick: handleLikeClick } = useMutationReaction(
        episodeContext?.current.reaction_type === EReactionType.LIKE ? true : false,
        episode_id,
        ReactionService.postReactionLikeEpisode,
        ReactionService.deleteReactionLikeEpisode,
        ['episodes']
    );

    const { localReaction: localDisike, handleReactionClick: handleDislikeClick } = useMutationReaction(
        episodeContext?.current.reaction_type === EReactionType.DISLIKE ? true : false,
        episode_id,
        ReactionService.postReactionDislikeEpisode,
        ReactionService.deleteReactionDislikeEpisode,
        ['episodes']
    );

    const { postHistory } = useMutationHistory();
    const { postView } = useMutationView();

    useEffect(() => {
        const finger = async () => {
            const visitor_id = await getFingerprintId();
            const overview_id = overview?._id;
            const episode_id = episodeContext?.current._id;
            if (visitor_id && overview_id && episode_id) {
                postHistory({ overview_id, episode_id });
                postView({ visitor_id, overview_id, episode_id });
            }
        };

        const timeoutId = setTimeout(() => {
            finger();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [overview?._id, episodeContext?.current._id]);

    const handleShare = () => {
        const currentURL = window.location.href;
        navigator.clipboard
            .writeText(currentURL)
            .then(() => alert('Đã sao chép liên kết!'))
            .catch((err) => console.error('Lỗi sao chép:', err));
    };

    const isLoading = isLoadingOverview || isLoadingEpisode || isLoadingEpisodeURI;

    if (!overview && !isLoading) return <div className={cx('no-content')}>No content available</div>;

    return (
        <div className={cx('watchWrapper')} key={episodeWithId}>
            <div className={cx('watchContainer__player')}>
                {dataURI ? <iframe src={dataURI.uri} allow="fullscreen" allowFullScreen></iframe> : <img src={episodeContext?.current.img} alt="Fallback" />}
            </div>
            <div className={cx('watchContainer')}>
                <div className={cx('watchContainer__body')}>
                    <div className={cx('watchContainer__media')}>
                        {overview && (
                            <div className={cx('watchContainer__media__header')}>
                                <div className={cx('watchContainer__media__parent')}>
                                    <div className={cx('watchContainer__media__parent__title')}>
                                        <h4 onClick={() => navigate(routes.overviewURL(overview._id, overview.original_title))}>{overview.original_title}</h4>
                                    </div>
                                    <div className={cx('watchContainer__media__parent__rating')}>
                                        <span>{overview.average_rating}</span>&nbsp;
                                        <span className={cx('watchContainer__media__parent__rating__icon')}>
                                            <FaStar size={7} />
                                        </span>
                                        &nbsp;
                                        <span>{overview.count_rating}</span>&nbsp;
                                        <span>Votes</span>
                                    </div>
                                </div>
                                <div className={cx('watchContainer__media__header__bookmark')}>
                                    <AuthProvider>
                                        {localBookmark ? (
                                            <Button contentCenter onClick={() => handleBookmarkClick()}>
                                                <FaBookmark color={EColor.WHITE_COLOR} size={ESize.ICON - 3} strokeWidth={1} />
                                            </Button>
                                        ) : (
                                            <Button contentCenter onClick={() => handleBookmarkClick()}>
                                                <FaRegBookmark color={EColor.WHITE_COLOR} size={ESize.ICON - 3} strokeWidth={1} />
                                            </Button>
                                        )}
                                    </AuthProvider>
                                </div>
                            </div>
                        )}

                        {episodeContext && Object.keys(episodeContext).length > 0 && episodeContext.current && (
                            <>
                                {overview?.type === EMovieType.TV_SERIES ? (
                                    <h3 className={cx('watchContainer__media__heading')}>
                                        E{episodeContext.current.episode_number} - {episodeContext.current.title}
                                    </h3>
                                ) : (
                                    <h3 className={cx('watchContainer__media__heading')}>{episodeContext.current.title}</h3>
                                )}
                            </>
                        )}

                        {overview && (
                            <div className={cx('watchContainer__media__tags')}>
                                {overview.age_rating === EAgeRating.PG_13 + 1 ? <AgeRating14 width="35px" /> : <AgeRating16 width="35px" />}
                                {overview.subtitle_languages.length > 0 && overview.dub_languages.length > 0 ? (
                                    <span className={cx('dot')}>• Sub | Dub</span>
                                ) : overview.subtitle_languages.length > 0 ? (
                                    <span className={cx('dot')}>• Subtitled</span>
                                ) : overview.dub_languages.length > 0 ? (
                                    <span className={cx('dot')}>• Dubtitled</span>
                                ) : (
                                    <span className={cx('dot')}>• Raw</span>
                                )}
                            </div>
                        )}

                        {episodeContext && Object.keys(episodeContext).length > 0 && episodeContext.current && (
                            <div className={cx('watchContainer__media__releaseDate')}>
                                <span>Release on</span>&nbsp;
                                <span>
                                    {new Date(episodeContext.current.release_date).toLocaleString('en-US', {
                                        timeZone: 'UTC',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour12: true,
                                    })}
                                </span>
                            </div>
                        )}

                        <div className={cx('watchContainer__media__actions')}>
                            {episodeContext && Object.keys(episodeContext).length > 0 && episodeContext.current && (
                                <>
                                    <AuthProvider>
                                        <div className={cx('watchContainer__media__actions__reacts')}>
                                            <Button
                                                marginIcon
                                                contentCenter
                                                leftIcon={localLike ? <BiSolidLike size={ESize.ICON} /> : <BiLike size={ESize.ICON} />}
                                                onClick={() => {
                                                    handleLikeClick();
                                                }}
                                            >
                                                {episodeContext.current.count_like}
                                            </Button>
                                            <Button
                                                marginIcon
                                                contentCenter
                                                leftIcon={localDisike ? <BiSolidDislike size={ESize.ICON} /> : <BiDislike size={ESize.ICON} />}
                                                onClick={() => {
                                                    handleDislikeClick();
                                                }}
                                            >
                                                {episodeContext.current.count_dislike}
                                            </Button>
                                        </div>
                                    </AuthProvider>
                                    <div className={cx('watchContainer__media__actions__share')}>
                                        <Button onClick={handleShare}>
                                            <GrShareOption size={ESize.ICON} />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={cx('watchContainer__media__expandable', { active: showMore })}>
                            <div className={cx('watchContainer__media__expandable__section')}>
                                {episodeContext && Object.keys(episodeContext).length > 0 && episodeContext.current && (
                                    <p className={cx('watchContainer__media__expandable__section__text')}>{episodeContext.current.description}</p>
                                )}
                                <div className={cx('watchContainer__media__expandable__section__languages__details')}>
                                    {overview && (
                                        <>
                                            <div className={cx('watchContainer__media__expandable__section__languages__details__row')}>
                                                <div className={cx('watchContainer__media__expandable__section__languages__details__row__collum')}>
                                                    <h5>Audio</h5>
                                                </div>
                                                <div className={cx('watchContainer__media__expandable__section__languages__details__row__collum')}>
                                                    {overview!.dub_languages.length > 0 ? (
                                                        <span className={cx('italic')}>
                                                            {overview!.dub_languages.map((dubtitle) => dubtitle.charAt(0).toUpperCase() + dubtitle.slice(1)).join(', ')}
                                                        </span>
                                                    ) : (
                                                        <span className={cx('italic')}>Raw</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={cx('watchContainer__media__expandable__section__languages__details__row')}>
                                                <div className={cx('watchContainer__media__expandable__section__languages__details__row__collum')}>
                                                    <h5>Subtitles</h5>
                                                </div>
                                                <div className={cx('watchContainer__media__expandable__section__languages__details__row__collum')}>
                                                    {overview!.subtitle_languages.length > 0 ? (
                                                        <span className={cx('italic')}>
                                                            {overview!.subtitle_languages.map((subtitle) => subtitle.charAt(0).toUpperCase() + subtitle.slice(1)).join(', ')}
                                                        </span>
                                                    ) : (
                                                        <span className={cx('italic')}>None</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={cx('watchContainer__media__expandable__section__languages__details__row')}>
                                                <div className={cx('watchContainer__media__expandable__section__languages__details__row__collum')}>
                                                    <h5>Content Advisory</h5>
                                                </div>
                                                {overview && (
                                                    <div className={cx('watchContainer__media__expandable__section__languages__details__row__collum')}>
                                                        <span>{overview.age_rating}</span>
                                                        <span>+</span>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button contentStart className={cx('watchContainer__media__expandable__btn__show')} onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Show less' : 'Show more'}
                        </Button>
                    </div>
                    {episodeContext && (episodeContext.previous || episodeContext.next) && (
                        <div className={cx('watchContainer__episodes')}>
                            {episodeContext.next && (
                                <div className={cx('watchContainer__episodes__group')}>
                                    <h4 className={cx('watchContainer__episodes__title__next')}>Next Episode</h4>
                                    <div className={cx('watchContainer__episodes__list')}>
                                        <WCard
                                            _id={episodeContext.next._id}
                                            title={episodeContext.next.title}
                                            episodeNumber={episodeContext.next.episode_number}
                                            subtitle_languages={overview?.subtitle_languages || []}
                                            dub_languages={overview?.dub_languages || []}
                                            premium={episodeContext.next.premium}
                                            img={episodeContext.next.img}
                                        />
                                    </div>
                                </div>
                            )}
                            {episodeContext.previous && (
                                <div className={cx('watchContainer__episodes__group')}>
                                    <h4 className={cx('watchContainer__episodes__title__prev')}>Previous Episode</h4>
                                    <div className={cx('watchContainer__episodes__list')}>
                                        <WCard
                                            _id={episodeContext.previous._id}
                                            title={episodeContext.previous.title}
                                            episodeNumber={episodeContext.previous.episode_number}
                                            subtitle_languages={overview?.subtitle_languages || []}
                                            dub_languages={overview?.dub_languages || []}
                                            premium={episodeContext.previous.premium}
                                            img={episodeContext.previous.img}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className={cx('watchContainer__comments')}>
                    {episode_id && episodeContext && Object.keys(episodeContext).length > 0 && episodeContext.current && (
                        <ListComment episode_id={episode_id} count_comment={episodeContext?.current.count_comment} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Watch;
