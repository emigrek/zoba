import { FC, ReactNode, useState } from 'react'

interface DropdownProps {
    trigger: ReactNode,
    content: ReactNode,
    defaultOpen?: boolean
}

const Dropdown: FC<DropdownProps> = ({
    trigger,
    content,
    defaultOpen = false
}) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="relative">
            <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
                {trigger}
            </div>
            {
                open ? (
                    <div className="absolute top-10 right-0 w-56 bg-white/5 my-4 p-4 rounded-lg">
                        {content}
                    </div>
                ) : null
            }
        </div>
    )
}

export default Dropdown