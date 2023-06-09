import cn from '@/utils/cn'
import Link from 'next/link'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import useDropdown from './useDropdown'

interface DropdownLinkItemProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string,
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DropdownLinkItem: FC<DropdownLinkItemProps> = ({ onClick, className, href, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    const { toggle } = useDropdown();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick ? onClick(event) : null;
        toggle();
    }

    return (
        <Link onClick={handleClick} href={href} className={cn('p-3 rounded-lg hover:bg-white/5 flex gap-3 cursor-pointer items-center transition duration-200', className)} {...props}>
            {IconL ? <IconL className='w-5 h-5' /> : null}
            <span>{children}</span>
            {IconR ? <IconR className='w-5 h-5' /> : null}
        </Link>
    )
}

DropdownLinkItem.displayName = "DropdownLinkItem";

export default DropdownLinkItem