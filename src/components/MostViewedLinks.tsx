import { api } from '@/utils/api'
import { FC } from 'react'
import LinkGrid from '@/components/LinkGrid';
import LinkItem from '@/components/LinkItem';
import ErrorFallback from '@/components/ErrorFallback';
import LinksSkeleton from '@/components/LinksSkeleton';
import NoLinks from '@/components/NoLinks';

const MostViewedLinks: FC = () => {
    const { data: links, isLoading, isError, refetch } = api.link.getMostVisited.useQuery();

    if (isLoading)
        return <LinksSkeleton size={3} />

    if (isError)
        return <ErrorFallback reload={() => refetch} />

    if (!links?.length)
        return <NoLinks />

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