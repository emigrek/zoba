import cn from '@/utils/cn'
import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface DrawerLinkItemProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DrawerLinkItem: FC<DrawerLinkItemProps> = ({ className, href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <Link href={href} className={cn('w-full px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 flex gap-6 cursor-pointer items-center font-semibold transition duration-100', className)} {...props}>
            {IconL ? <IconL className='w-6 h-6' /> : null}
            <span>{children}</span>
            {IconR ? <IconR className='w-6 h-6' /> : null}
        </Link>
    )
}

export default DrawerLinkItem