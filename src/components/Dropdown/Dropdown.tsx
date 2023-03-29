import { FC, ReactNode, useState } from 'react'

interface DropdownProps {
    trigger: ReactNode,
    children: ReactNode,
    defaultOpen?: boolean
}

const Dropdown: FC<DropdownProps> = ({
    trigger,
    children,
    defaultOpen = false
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
                        <div className="absolute top-10 z-10 right-0 w-56 bg-white/5 my-4 p-4 rounded-lg flex flex-col gap-2 shadow-lg">
                            {children}
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