import { FC, ReactNode } from 'react'

interface SiteHeaderProps {
    label: string,
    action?: ReactNode[]
}

const SiteHeader: FC<SiteHeaderProps> = ({ label, action }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="font-bold text-3xl">
                {label}
            </div>
            <div className="flex gap-2">
                {
                    action ? action.map((item, index) => {
                        return <div key={index}>{item}</div>
                    }) : null
                }
            </div>
        </div>
    )
}

export default SiteHeader