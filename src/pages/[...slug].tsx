import { Container } from '@/components/ui/Container/Container';
import useLinkRedirect from '@/hooks/useLinkRedirect';
import { FC } from 'react'
import { BiError, BiLoaderAlt } from 'react-icons/bi';

interface InterstitialProps { }

const Interstitial: FC<InterstitialProps> = () => {
    const link = useLinkRedirect();

    if (!link || !link.data) {
        return (
            <Container>
                <div className="flex flex-col w-full gap-2 text-center">
                    <BiError className="w-28 h-28 mx-auto fill-white" />
                    <h1 className='text-neutral-100 text-4xl font-bold'>Invalid link</h1>
                    <p className='text-neutral-400 text-xl'>Link may have expired or does not exist</p>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="flex flex-col w-full gap-2 text-center">
                <BiLoaderAlt className="animate-spin w-28 h-28 mx-auto fill-white" />
                <h1 className='text-neutral-100 text-4xl font-bold'>You are being redirected...</h1>
                <p className='text-neutral-400 text-xl'>Please standby</p>
            </div>
        </Container>
    )
}

export default Interstitial;