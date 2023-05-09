import { FC, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib';
import { Sheet } from '@/components/ui/Sheet/Sheet';
import cn from '@/utils/cn';
import Spinner from '@/components/ui/Spinner/Spinner';
import ErrorFallback from '@/components/ErrorFallback';

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: IconType;
    loading?: boolean;
    isError?: boolean;
    reload?: () => void;
}

const DashboardCard: FC<DashboardCardProps> = ({ className, label, icon: Icon, children, loading, isError, reload }) => {
    return (
        <Sheet className={cn("w-full flex flex-col justify-between gap-2 h-36 md:h-44", className)}>
            <div className="flex justify-between gap-2">
                <div className="text-md md:text-xl text-neutral-400">{label}</div>
                <Icon className="w-8 h-8 md:w-16 md:h-16 opacity-40" />
            </div>
            <div className='flex items-center flex-grow justify-start'>
                {isError ? <ErrorFallback reload={reload} /> : null}
                {loading ? <Spinner className="w-10 h-10" /> : children}
            </div>
        </Sheet>
    )
}

export default DashboardCard;