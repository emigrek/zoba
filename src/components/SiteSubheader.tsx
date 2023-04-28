import { FC, ReactNode } from 'react'

interface SiteSubheaderProps {
    label: string,
    actions?: ReactNode[]
}

const SiteSubheader: FC<SiteSubheaderProps> = ({ label, actions }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-3 text-neutral-300 md:items-center">
            <div className="font-bold text-2xl">
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

export default SiteSubheader