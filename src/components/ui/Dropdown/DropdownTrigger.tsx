import cn from '@/utils/cn'
import { FC, HTMLAttributes, ReactElement } from 'react'
import useDropdown from './useDropdown'
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'

interface DropdownTriggerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement,
    openIdenticator?: boolean
}

const DropdownTrigger: FC<DropdownTriggerProps> = ({ openIdenticator, onClick, className, children, ...props }) => {
    const { toggle, open, targetRef } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClick ? onClick(e) : null;
        toggle();
    }

    return (
        <div ref={targetRef} onClick={handleClick} className={cn("relative cursor-pointer flex items-center gap-2", className)} {...props}>
            {children}
            {openIdenticator && <>{open ? <BiCaretUp className='w-6 h-6'/> : <BiCaretDown className='w-6 h-6'/>}</> }
        </div>
    )
}

export default DropdownTrigger