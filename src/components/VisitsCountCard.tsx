import { api } from '@/utils/api'
import { FC } from 'react'
import { IoEye } from 'react-icons/io5'

import DashboardCard from '@/components/DashboardCard'
import { numberFormat } from '@/utils/formatters'

const VisitsCountCard: FC = () => {
    const { data, isLoading, isError, refetch } = api.visit.getCount.useQuery();

    return (
        <DashboardCard label="Visits" icon={IoEye} loading={isLoading} isError={isError} reload={() => refetch}>
            <div className="text-5xl font-bold">{numberFormat.format(data || 0)}</div>
        </DashboardCard>
    )
}

export default VisitsCountCard;