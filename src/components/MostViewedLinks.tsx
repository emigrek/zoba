import { api } from '@/utils/api'
import { FC } from 'react'
import LinkGrid from './LinkGrid';
import LinkItem from './LinkItem';
import LinkItemSkeleton from '@/components/LinkItemSkeleton';
import ErrorFallback from './ErrorFallback';

const MostViewedLinks: FC = () => {
    const { data: links, isLoading, isError, refetch } = api.link.getMostVisited.useQuery();

    if (isLoading)
        return (
            <LinkGrid>
                {
                    Array(3).fill(null).map((_, index) => {
                        return <LinkItemSkeleton key={index} />
                    })
                }
            </LinkGrid>
        );

    if (isError)
        return <ErrorFallback reload={() => refetch} />

    return (
        <LinkGrid>
            {
                links?.map((link, index) => {
                    return <LinkItem key={index} link={link} />
                })
            }
        </LinkGrid>
    )
}

export default MostViewedLinks