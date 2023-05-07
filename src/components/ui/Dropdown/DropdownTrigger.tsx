import cn from '@/utils/cn'
import { FC, HTMLAttributes, ReactElement, cloneElement } from 'react'
import useDropdown from './useDropdown'

interface DropdownTriggerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement
}

const DropdownTrigger: FC<DropdownTriggerProps> = ({ className, children, ...props }) => {
    const { setIsOpen, isOpen } = useDropdown();

    return cloneElement(children, {
        className: cn("relative cursor-pointer", children.props.className, className),
        onClick: () => {
            children.props.onClick ? children.props.onClick() : null;
            setIsOpen(!isOpen);
        },
        ...props
    });
}

export default DropdownTrigger