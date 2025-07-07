import { useInfiniteQuery } from '@tanstack/react-query';
import { IOverviewResponse } from '@/interfaces/overview.interface';
import { OverviewService } from '@/services/overview.service';
import { EMovieSort } from '@/enums';
import { BookmarkService } from '@/services/bookmark.service';

interface OverviewQueryPayload {
    limit: number;
    cursor?: string;
    start_date?: Date;
    end_date?: Date;
}

type OverviewQueryCallback = (payload: OverviewQueryPayload) => Promise<{ overviews: IOverviewResponse[]; hasMore: boolean }>;

export const useOverviewInfinite = (queryKey: any[], callbackFn: OverviewQueryCallback, extraPayload: Omit<OverviewQueryPayload, 'limit' | 'cursor'> = {}, limit = 24) => {
    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam = null }) => {
            const res = await callbackFn({
                ...extraPayload,
                limit,
                cursor: pageParam || undefined,
            });
            return res;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.hasMore) {
                return lastPage.overviews[lastPage.overviews.length - 1]?._id;
            }
            return undefined;
        },
        initialPageParam: null as string | null, // Explicitly type initialPageParam
    });
};

export const useLastedReleases = () => useOverviewInfinite(['overviews', 'lasted-release', 'infinite'], ({ limit, cursor }) => OverviewService.getOverviewsLastedRelease(limit, cursor));

export const useMostPopular = () => useOverviewInfinite(['overviews', 'most-popular', 'infinite'], ({ limit, cursor }) => OverviewService.getOverviewsPopular(limit, cursor));

export const useSimulcastSesson = (start_date: Date, end_date: Date) =>
    useOverviewInfinite(['overviews', 'simulcast-seasoon', 'infinite', start_date, end_date], ({ limit, cursor }) => OverviewService.getOverviewsSimulcastSeason(limit, start_date, end_date, cursor), {
        start_date,
        end_date,
    });

export const useBookmarks = (created_at: EMovieSort) =>
    useOverviewInfinite(['overviews', 'bookmarks', 'infinite', created_at], ({ limit, cursor }) =>
        BookmarkService.getBookmarks({
            created_at,
            limit,
            last_id: cursor,
        })
    );
