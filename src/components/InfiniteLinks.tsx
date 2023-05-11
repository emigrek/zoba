import { api } from '@/utils/api';
import { FC, Fragment, useEffect } from 'react'
import LinkGrid from '@/components/LinkGrid';
import LinkItemSkeleton from '@/components/LinkItemSkeleton';
import ErrorFallback from '@/components/ErrorFallback';
import { MdOutlet } from 'react-icons/md';
import { ExtendedLink } from 'types';
import LinkItem from '@/components/LinkItem';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-hot-toast';
import useSearchModalStore from '@/stores/searchModal';

const InfiniteLinks: FC = () => {
    const { ref, inView } = useInView();
    const { query } = useSearchModalStore();

    const { data, fetchNextPage, isLoading, isError, refetch } = api.link.getInfinite.useInfiniteQuery(
        { limit: 25, query },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

    const noSearchResults = query && data?.pages.length && data?.pages[0]?.links.length === 0;
    const noData = data?.pages.length === 0;

    useEffect(() => {
        if (inView && !isLoading) {
            fetchNextPage().catch(() => {
                toast.error("Something went wrong while fetching more links", { icon: '🤔' });
            });
        }
    }, [inView, isLoading, fetchNextPage]);

    if (isLoading) {
        return (
            <LinkGrid>
                {
                    Array(6).fill(null).map((_, index) => (
                        <LinkItemSkeleton key={index} />
                    ))
                }
            </LinkGrid>
        )
    }

    if (isError) {
        return (
            <ErrorFallback reload={() => refetch} />
        )
    }

    if (noSearchResults) {
        return (
            <div className="flex flex-col gap-3 items-center justify-center text-neutral-500 py-10">
                <MdOutlet className="w-20 h-20" />
                <p>No links matched your search.</p>
            </div>
        )
    }

    if (noData) {
        return (
            <div className="flex flex-col gap-3 items-center justify-center text-neutral-500 py-10">
                <MdOutlet className="w-20 h-20" />
                <p>You don&apos;t have any links yet.</p>
            </div>
        )
    }

    return (
        <LinkGrid>
            {
                data?.pages.map((page, index) => (
                    <Fragment key={index}>
                        {
                            page.links.map((link: ExtendedLink, index) => {
                                const isLast = index === page.links.length - 1;
                                return isLast ? <LinkItem key={link.id} ref={ref} link={link} /> : <LinkItem key={link.id} link={link} />;
                            })
                        }
                    </Fragment>
                ))
            }
        </LinkGrid>
    )
}

export default InfiniteLinks