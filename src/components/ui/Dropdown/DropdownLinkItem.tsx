import cn from '@/utils/cn'
import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface DropdownLinkItemProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DropdownLinkItem: FC<DropdownLinkItemProps> = ({ className, href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <Link href={href} className={cn('p-3 rounded-lg hover:bg-white/5 flex gap-4 cursor-pointer items-center font-semibold transition duration-200', className)} {...props}>
            {IconL ? <IconL className='w-5 h-5' /> : null}
            <span>{children}</span>
            {IconR ? <IconR className='w-5 h-5' /> : null}
        </Link>
    )
}

export default DropdownLinkItem