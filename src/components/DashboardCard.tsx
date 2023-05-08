import { FC, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib';
import { Sheet } from './ui/Sheet/Sheet';
import cn from '@/utils/cn';
import Spinner from './ui/Spinner/Spinner';
import { Button } from './ui/Button/Button';
import { RxReload } from 'react-icons/rx';
import { IoAlertCircle } from 'react-icons/io5';

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: IconType;
    loading?: boolean;
    isError?: boolean;
    reload?: () => void;
}

type ErrorFallbackProps = Pick<DashboardCardProps, 'reload'>;

const ErrorFallback: FC<ErrorFallbackProps> = ({ reload }) => {
    return (
        <div className="flex gap-2 py-1 items-cente4">
            <IoAlertCircle className="w-14 h-14 text-red-400" />
            <div className='flex flex-col gap-1'>
                <div className="text-red-400 text-sm">Something went wrong</div>
                <Button onClick={reload} variant={'red'} size={'small'} iconLeft={RxReload}>Try again</Button>
            </div>
        </div>
    )
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