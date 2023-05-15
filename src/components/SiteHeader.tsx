import cn from '@/utils/cn'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface SiteHeaderProps extends HTMLAttributes<HTMLDivElement> {
    label: string,
    action?: ReactNode
}

const SiteHeader: FC<SiteHeaderProps> = ({ className, label, action, ...props }) => {
    return (
        <div className={cn("flex flex-col md:flex-row justify-between gap-3 md:items-center", className)} {...props}>
            <div className="font-bold text-2xl md:text-3xl">
                {label}
            </div>
            <div className="flex gap-2">
                {action}
            </div>
        </div>
    )
}

export default SiteHeader