import MotionContainer from '@/components/MotionContainer'
import { Button } from '@/components/ui/Button/Button'
import { fadeInVariant } from '@/motions/fade'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { NextPageWithLayout } from './_app'
import { BiHome } from 'react-icons/bi'

const NotFoundPage: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="flex items-center w-screen h-screen justify-center" size={'small'}>
            <div className='flex flex-col items-center gap-14'>
                <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full md:gap-5">
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
                        <div className='flex mt-7 md:mt-4 mx-auto md:ml-auto md:mr-0 gap-2 items-center'>
                            <Button size={'medium'} onClick={() => router.back()} iconRight={RiArrowGoBackFill}>
                                Back
                            </Button>
                            <Button variant={'accent'} size={'medium'} onClick={() => router.push('/')} iconRight={BiHome}>
                                Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </MotionContainer>
    )
}

NotFoundPage.getLayout = (page) => page

export default NotFoundPage