import { FC, ReactNode } from 'react'

interface SiteSubheaderProps {
    label: string,
    action?: ReactNode
}

const SiteSubheader: FC<SiteSubheaderProps> = ({ label, action }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-3 text-neutral-300 md:items-center">
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