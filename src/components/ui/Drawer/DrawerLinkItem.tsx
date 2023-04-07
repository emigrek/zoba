import cn from '@/utils/cn'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { drawerItemVariants } from './DrawerItem'
import { iconVariants } from '../Button/Button'

interface DrawerLinkItemProps extends HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof drawerItemVariants> {
    href: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DrawerLinkItem: FC<DrawerLinkItemProps> = ({ className, size, variant, href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <Link href={href} className={cn(drawerItemVariants({ className, size, variant }))} {...props}>
            {IconL ? <IconL className={cn(iconVariants({ size, variant }))} /> : null}
            <span>{children}</span>
            {IconR ? <IconR className={cn(iconVariants({ size, variant }))} /> : null}
        </Link>
    )
}

export default DrawerLinkItem