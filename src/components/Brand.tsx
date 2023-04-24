import { siteConfig } from '@/config/site'
import Image from 'next/image'
import { FC } from 'react'

const Brand: FC = () => {
    return (
        <div className='flex flex-row gap-4 px-2 py-16 md:p-16 items-center justify-center'>
            <div className='relative w-14 h-14 md:w-10 md:h-10'>
                <Image alt="logo" src="/zoba.svg" fill />
            </div>
            <div className='font-bold hidden md:block text-2xl'>
                {siteConfig.name}
            </div>
        </div>
    )
}

export default Brand