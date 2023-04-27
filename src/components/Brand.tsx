import { siteConfig } from '@/config/site'
import Image from 'next/image'
import { FC } from 'react'

const Brand: FC = () => {
    return (
        <div className='flex flex-row gap-4 px-2 h-32 items-center justify-center'>
            <div className='relative w-10 h-10'>
                <Image alt="logo" src="/zoba.svg" fill />
            </div>
            <div className='font-bold hidden md:block text-2xl'>
                {siteConfig.name}
            </div>
        </div>
    )
}

export default Brand