import { FC, HTMLAttributes, ReactNode } from 'react'
import useDropdown from './useDropdown';
import cn from '@/utils/cn';
import { useClickOutside } from '@mantine/hooks';

interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DropdownContent: FC<DropdownContentProps> = ({ children, className, ...props }) => {
    const { setIsOpen, isOpen } = useDropdown();
    const dropdownRef = useClickOutside(() => setIsOpen(false));

    if(!isOpen) return null;

    return (
        <div ref={dropdownRef} className={cn("absolute top-10 z-10 right-0 w-56 bg-neutral-900 my-2 p-2 rounded-lg flex flex-col gap-2 shadow-lg", className)} {...props}>
            {children}
        </div>
    )
}

DropdownContent.displayName = "DropdownContent";

export default DropdownContent