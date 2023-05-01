import { FC } from 'react'
import { Sheet } from '@/components/ui/Sheet/Sheet'

const LinkItemSkeleton: FC = () => {
    return (
        <Sheet size={'small'} className='w-full flex flex-row justify-between items-center py-7'>
            <div className='flex items-center gap-5 opacity-40 animate-pulse'>
                <div className='w-12 h-12 bg-neutral-600 rounded-xl' />
                <div className='flex flex-col gap-1'>
                    <div className='bg-neutral-200 w-24 h-4 rounded-xl' />
                    <div className='bg-neutral-300 w-12 h-2 rounded-xl' />
                    <div className='bg-neutral-500 w-24 h-2 rounded-xl' />
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-600 opacity-10 animate-pulse" />
        </Sheet>
    )
}

export default LinkItemSkeleton