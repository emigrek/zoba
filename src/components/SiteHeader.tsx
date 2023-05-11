import { FC, ReactNode } from 'react'

interface SiteHeaderProps {
    label: string,
    action?: ReactNode
}

const SiteHeader: FC<SiteHeaderProps> = ({ label, action }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
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