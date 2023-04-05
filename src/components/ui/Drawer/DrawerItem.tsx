import cn from '@/utils/cn'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface DrawerItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DrawerItem: FC<DrawerItemProps> = ({ className, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <div className={cn('w-full px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 flex gap-6 cursor-pointer items-center font-semibold transition duration-100', className)} {...props}>
            {IconL ? <IconL className='w-6 h-6' /> : null}
            <span>{children}</span>
            {IconR ? <IconR className='w-6 h-6' /> : null}
        </div>
    )
}

export default DrawerItem