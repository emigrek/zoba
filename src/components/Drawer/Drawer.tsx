import { FC, ReactNode } from 'react'

interface DrawerProps {
    open: boolean,
    onClickOutside?: () => void,
    children: ReactNode
}

const Drawer: FC<DrawerProps> = ({
    open = false,
    onClickOutside = () => {},
    children
}) => {
    if (!open) return null;

    return (
        <>
            <div className='w-64 absolute h-screen left-0 top-0 bg-neutral-900 z-30'>
                {children}
            </div>
            <div onClick={onClickOutside} className="w-full h-full absolute z-20 bg-black/60"/>
        </>
    )
}

export default Drawer