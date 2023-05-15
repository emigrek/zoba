import cn from '@/utils/cn'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface SiteSubheaderProps extends HTMLAttributes<HTMLDivElement> {
    label: string,
    action?: ReactNode
}

const SiteSubheader: FC<SiteSubheaderProps> = ({ className, label, action, ...props }) => {
    return (
        <div className={cn("flex flex-col md:flex-row justify-between gap-3 text-neutral-300 md:items-center", className)} {...props}>
            <div className="font-semibold text-xl md:text-2xl">
                {label}
            </div>
            <div className="flex gap-2">
                {action}
            </div>
        </div>
    )
}

export default SiteSubheader