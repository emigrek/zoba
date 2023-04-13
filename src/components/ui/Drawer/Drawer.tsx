import useDrawer from '@/hooks/useDrawer';
import cn from '@/utils/cn';
import { FC, HTMLAttributes, ReactNode } from 'react'

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    items: ReactNode[]
}

const Drawer: FC<DrawerProps> = ({
    className,
    items
}) => {
    const {drawer, setDrawer} = useDrawer();
    if (!drawer) return null;

    return (
        <>
            <div className={cn('w-64 absolute h-screen left-0 top-0 bg-neutral-900 z-30', className)}>
                <div className='flex flex-col items-center justify-center gap-2 w-full mt-14 p-4'>
                    {
                        items.map((item, index) => (
                            <div onClick={() => setDrawer(false)} className='w-full' key={index}>
                                {item}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div onClick={() => setDrawer(false)} className="w-full h-full absolute z-20 bg-black/60" />
        </>
    )
}

export default Drawer