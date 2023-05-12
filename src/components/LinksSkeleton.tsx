import { FC } from 'react'
import LinkGrid from '@/components/LinkGrid'
import LinkItemSkeleton from '@/components/LinkItemSkeleton'

interface LinksSkeletonProps {
    size?: number
}

const LinksSkeleton: FC<LinksSkeletonProps> = ({ size = 6 }) => {
    return (
        <LinkGrid>
            {
                Array(size).fill(null).map((_, index) => (
                    <LinkItemSkeleton key={index} />
                ))
            }
        </LinkGrid>
    )
}

export default LinksSkeleton