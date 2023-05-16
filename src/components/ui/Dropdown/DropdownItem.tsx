import cn from '@/utils/cn'
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import useDropdown from './useDropdown'

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DropdownItem: FC<DropdownItemProps> = ({ onClick, className, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    const { toggle } = useDropdown();

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClick ? onClick(event) : null;
        toggle();
    }

    return (
        <div onClick={handleClick} className={cn('p-3 rounded-lg hover:bg-white/5 flex gap-3 cursor-pointer items-center transition duration-200', className)} {...props}>
            {IconL ? <IconL className='w-5 h-5' /> : null}
            <span>{children}</span>
            {IconR ? <IconR className='w-5 h-5' /> : null}
        </div>
    )
}

DropdownItem.displayName = "DropdownItem";

export default DropdownItem