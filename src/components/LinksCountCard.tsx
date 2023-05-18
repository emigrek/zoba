import { api } from '@/utils/api'
import { FC } from 'react'
import { BiLink } from 'react-icons/bi';

import DashboardCard from '@/components/DashboardCard'
import { numberFormat } from '@/utils/formatters';

const LinksCountCard: FC = () => {
    const { data, isLoading, isError, refetch } = api.link.getCount.useQuery();

    return (
        <DashboardCard label="Links" icon={BiLink} loading={isLoading} isError={isError} reload={() => refetch}>
            <div className="text-5xl font-bold">{numberFormat.format(data || 0)}</div>
        </DashboardCard>
    )
}

export default LinksCountCard;