import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface DropdownItemProps extends HTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
    href?: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DropdownItem: FC<DropdownItemProps> = ({ href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    if(href)
        return (
            <Link href={href} className='p-3 rounded-lg hover:bg-white/5 flex gap-4 cursor-pointer items-center font-semibold' {...props}>
                {IconL ? <IconL className='w-5 h-5' /> : null}
                <span>{children}</span>
                {IconR ? <IconR className='w-5 h-5' /> : null}
            </Link>
        )
    else
        return (
            <div className='p-3 rounded-lg hover:bg-white/5 flex gap-4 cursor-pointer items-center font-semibold' {...props}>
                {IconL ? <IconL className='w-5 h-5' /> : null}
                <span>{children}</span>
                {IconR ? <IconR className='w-5 h-5' /> : null}
            </div>
        )
}

export default DropdownItem