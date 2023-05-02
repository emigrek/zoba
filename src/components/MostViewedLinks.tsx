import { api } from '@/utils/api'
import { FC } from 'react'
import LinkGrid from './LinkGrid';
import LinkItem from './LinkItem';
import LinkItemSkeleton from '@/components/LinkItemSkeleton';

const MostViewedLinks: FC = () => {
    const { data: links, isLoading } = api.link.getMostVisited.useQuery();

    if (isLoading)
        return (
            <LinkGrid>
                {
                    [...Array(3)].map((_, index) => {
                        return <LinkItemSkeleton key={index} />
                    })
                }
            </LinkGrid>
        )

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