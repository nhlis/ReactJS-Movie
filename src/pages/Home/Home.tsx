import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Calendar } from '../components/Calendar/Calender.tsx';
import { Banner } from '../components/Banner/Banner.tsx';
import { News } from '../components/News/News..tsx';
import { LargeCard } from '../components/LargeCard/LargeCard.tsx';
import { StillLooking } from '../components/StillLooking/StillLooking.tsx';
import { ListHeroCard } from '../components/ListHeroCard/ListHeroCard.tsx';
import { Slide } from '../../components/Slide/Slide.tsx';
import { HeroSlide } from '../components/HeroSlide/HeroSlide.tsx';
import { data } from '../../constants/index.ts';
import { getSeason } from '../../utils/get-season.ts';
import { OverviewService } from '../../services/overview.service.ts';
import { useQueries } from '@tanstack/react-query';
import { IOverviewResponse } from '../../interfaces/overview.interface.ts';

const cx = classNames.bind(styles);

function Home() {
    const results = useQueries({
        queries: [
            {
                queryKey: ['overviews', 'hero-slide'],
                queryFn: () => OverviewService.getOverviewsHeroSlides(5),
            },
            {
                queryKey: ['overviews', 'top-pick'],
                queryFn: () => OverviewService.getOverviewsTopPick(20),
            },
            {
                queryKey: ['overviews', 'new-season'],
                queryFn: () => OverviewService.getOverviewsNewSeason(20),
            },
            {
                queryKey: ['overviews', 'lasted-release'],
                queryFn: () => OverviewService.getOverviewsLastedRelease(20),
            },
            {
                queryKey: ['overviews', 'most-popular'],
                queryFn: () => OverviewService.getOverviewsPopular(20),
            },
            {
                queryKey: ['overviews', 'gloombusters'],
                queryFn: () => OverviewService.getOverviewsGloombusters(20),
            },
        ],
    });

    const heroSlides = results[0]?.data?.overviews;
    const topPick = results[1]?.data?.overviews;
    const newSeason = results[2]?.data?.overviews;
    const lastedRelease = results[3]?.data?.overviews;
    const mostPopular = results[4]?.data?.overviews;
    const gloombusters = results[5]?.data?.overviews;

    const isLoading = results.some((result) => result.isLoading);
    const error = results.some((result) => result.error);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = 'A Project: Watch Popular Anime';
    }, []);

    if (isLoading) {
        return <div className={cx('loading')}>Loading...</div>;
    }

    if (error) {
        return <div className={cx('error')}>Something went wrong!</div>;
    }

    return (
        <div className={cx('wrapper')}>
            {heroSlides && heroSlides.length > 0 && (
                <div className={cx('heroSlide')}>
                    <HeroSlide duration={10}>
                        {heroSlides.map((overview: IOverviewResponse) => (
                            <div key={overview._id} className={cx('HeroSlide__slide')}>
                                <Slide overview={overview} layout="main" />
                            </div>
                        ))}
                    </HeroSlide>
                </div>
            )}

            {topPick && topPick.length > 0 && (
                <div className={cx('listMovie', 'paddingTop')}>
                    <ListHeroCard title={'Top Picks for You'} cards={topPick} />
                </div>
            )}

            {newSeason && newSeason.length > 0 && (
                <div className={cx('listMovie')}>
                    <ListHeroCard title={`Latest Series From The ${getSeason().name} Season`} description={'The hottest new and continuing series have arrived on A Project!'} cards={newSeason} />
                </div>
            )}

            {lastedRelease && lastedRelease.length > 0 && (
                <div className={cx('listMovie')}>
                    <ListHeroCard title={"Latest Releases – Don't Miss Out!"} description={'Just Arrived on A Project!'} cards={lastedRelease} />
                </div>
            )}

            <div className={cx('calendarEpisode')}>
                <Calendar episodes={data.calendar} />
            </div>

            <div className={cx('banner')}>
                <Banner src={`https://lh3.googleusercontent.com/d/${data.imgSrc.BANNER1}`} />
            </div>

            <div className={cx('news')}>
                <News news={data.news} />
            </div>

            <div className={cx('banner')}>
                <Banner src={`https://lh3.googleusercontent.com/d/${data.imgSrc.BANNER3}`} />
            </div>

            {mostPopular && mostPopular.length > 0 && (
                <div className={cx('listMovie')}>
                    <ListHeroCard title={'Most Popular'} cards={mostPopular} />
                </div>
            )}

            {mostPopular && mostPopular.length > 0 && (
                <div className={cx('largeCard')}>
                    <LargeCard overviews={mostPopular.slice(18, 20)} />
                </div>
            )}

            {gloombusters && gloombusters.length > 0 && (
                <div className={cx('listMovie')}>
                    <ListHeroCard title={'The Gloombusters'} cards={gloombusters} />
                </div>
            )}

            <div>
                <StillLooking />
            </div>
        </div>
    );
}

export default Home;
