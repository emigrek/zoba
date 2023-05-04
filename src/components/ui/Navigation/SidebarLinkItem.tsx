import cn from '@/utils/cn'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { sidebarItemVariants } from '@/components/ui/Navigation/SidebarItem'
import { sidebarItemIconVariants } from '@/components/ui/Navigation/SidebarItem'

interface SidebarLinkItemProps extends HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarItemVariants> {
    href: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const SidebarLinkItem: FC<SidebarLinkItemProps> = ({ className, size, variant, href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <Link href={href} className={cn(sidebarItemVariants({ className, size, variant }))} {...props}>
            {IconL ? <IconL className={cn(sidebarItemIconVariants({ size, variant }))} /> : null}
            <span className='hidden md:block'>{children}</span>
            {IconR ? <IconR className={cn(sidebarItemIconVariants({ size, variant }))} /> : null}
        </Link>
    )
}

export default SidebarLinkItem