import { FC } from 'react'
import { IconType } from 'react-icons/lib'

interface PageHeaderProps {
    title: string,
    subtitle: string,
    icon: IconType
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, icon: Icon }) => {
    return (
        <div className="flex justify-between text-neutral-100 items-center">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-neutral-400 text-sm">
                    {subtitle}
                </p>
            </div>
            <div className="flex items-center justify-center">
                <Icon className="w-14 h-14" />
            </div>
        </div>
    )
}

export default PageHeader