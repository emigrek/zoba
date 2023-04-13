import cn from '@/utils/cn';
import { FC, HTMLAttributes, ReactNode, cloneElement, useState } from 'react'

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

    return (
        <>
            <div className="relative">
                <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
                    {trigger}
                </div>
                {
                    open ? (
                        <div className={cn("absolute top-10 z-10 right-0 w-56 bg-neutral-900 my-2 p-2 rounded-lg flex flex-col gap-2 shadow-lg", className)} {...props}>
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
            {open ? (
                <div onClick={() => setOpen(!open)} className='absolute w-full h-screen inset-0 z-0' />
            ) : null}
        </>
    )
}

export default Dropdown