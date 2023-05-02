import { FC, ReactNode } from 'react'

interface SiteHeaderProps {
    label: string,
    actions?: ReactNode[]
}

const SiteHeader: FC<SiteHeaderProps> = ({ label, actions }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
            <div className="font-bold text-2xl md:text-3xl">
                {label}
            </div>
            <div className="flex gap-2">
                {
                    actions ? actions.map((item, index) => {
                        return <div className='grow' key={index}>{item}</div>
                    }) : null
                }
            </div>
        </div>
    )
}

export default SiteHeader