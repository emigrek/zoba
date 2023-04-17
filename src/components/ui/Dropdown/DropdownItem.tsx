import cn from '@/utils/cn'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DropdownItem: FC<DropdownItemProps> = ({ className, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <div className={cn('p-3 rounded-lg hover:bg-white/5 flex gap-4 cursor-pointer items-center font-semibold transition duration-200', className)} {...props}>
            {IconL ? <IconL className='w-5 h-5' /> : null}
            <span>{children}</span>
            {IconR ? <IconR className='w-5 h-5' /> : null}
        </div>
    )
}

export default DropdownItem