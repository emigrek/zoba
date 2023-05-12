import MotionContainer from '@/components/MotionContainer'
import { Button } from '@/components/ui/Button/Button'
import { fadeInVariant } from '@/motions/fade'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { RiArrowGoBackFill } from 'react-icons/ri'

const NotFoundPage: NextPage = () => {
    const router = useRouter();

    return (
        <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="py-5" size={'small'}>
            <div className='flex flex-col items-center gap-14'>
                <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full">
                    <div className="relative w-64 h-64 md:h-96 md:w-96">
                        <Image priority src="/timed-out-error.svg" fill alt="Timed Out Error" />
                    </div>
                    <div className="text-neutral-100 text-center md:text-right flex flex-col gap-2">
                        <h1 className="text-9xl font-bold">
                            404
                        </h1>
                        <p className="text-neutral-400">
                            Page not found
                        </p>
                        <Button className='mt-7 md:mt-4 mx-auto md:ml-auto md:mr-0' size={'large'} onClick={() => router.back()} iconRight={RiArrowGoBackFill}>
                            Go back
                        </Button>
                    </div>
                </div>
            </div>
        </MotionContainer>
    )
}

export default NotFoundPage