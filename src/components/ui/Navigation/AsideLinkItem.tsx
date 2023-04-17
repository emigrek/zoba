import cn from '@/utils/cn'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { asideItemVariants } from './AsideItem'
import { iconVariants } from '../Button/Button'

interface AsideLinkItemProps extends HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof asideItemVariants> {
    href: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const AsideLinkItem: FC<AsideLinkItemProps> = ({ className, size, variant, href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <Link href={href} className={cn(asideItemVariants({ className, size, variant }))} {...props}>
            {IconL ? <IconL className={cn(iconVariants({ size, variant }))} /> : null}
            <span className='hidden md:block'>{children}</span>
            {IconR ? <IconR className={cn(iconVariants({ size, variant }))} /> : null}
        </Link>
    )
}

export default AsideLinkItem