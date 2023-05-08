import { api } from '@/utils/api'
import { FC } from 'react'
import { IoEye } from 'react-icons/io5'

import DashboardCard from '@/components/DashboardCard'

const VisitsCountCard: FC = () => {
    const { data, isLoading, isError, refetch } = api.visit.getCount.useQuery();

    return (
        <DashboardCard label="Visits" icon={IoEye} loading={isLoading} isError={isError} reload={refetch}>
            <div className="text-5xl font-bold">{data}</div>
        </DashboardCard>
    )
}

export default VisitsCountCard;