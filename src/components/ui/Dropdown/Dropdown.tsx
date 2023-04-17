import cn from '@/utils/cn';
import { FC, HTMLAttributes, ReactNode, useState, useRef } from 'react'
import { useClickOutside } from '@mantine/hooks';

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    trigger: ReactNode,
    items: ReactNode[],
    defaultOpen?: boolean
}

const Dropdown: FC<DropdownProps> = ({
    className,
    trigger,
    items,
    defaultOpen = false,
    ...props
}) => {
    const [open, setOpen] = useState(defaultOpen);
    const dropdownRef = useClickOutside(() => setOpen(false));

    return (
        <div className="relative">
            <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
                {trigger}
            </div>
            {
                open ? (
                    <div ref={dropdownRef} className={cn("absolute top-10 z-10 right-0 w-56 bg-neutral-900 my-2 p-2 rounded-lg flex flex-col gap-2 shadow-lg", className)} {...props}>
                        {
                            items.map((item, index) => (
                                <div onClick={() => setOpen(false)} key={index}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Dropdown