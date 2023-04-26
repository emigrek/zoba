import { FC, useState } from 'react'
import { BiError } from 'react-icons/bi'
import { Button } from '@/components/ui/Button/Button'
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc'
import { Container } from '@/components/ui/Container/Container';

const SignIn: FC = () => {
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        await signIn("google");
    }

    return (
        <Container>
            <div className="flex flex-col w-full gap-10 text-center">
                <div className="flex flex-col gap-2 text-center">
                    <BiError className="w-28 h-28 mx-auto fill-white" />
                    <h1 className='text-neutral-100 text-4xl font-bold'>Authorization required</h1>
                    <p className='text-neutral-400 text-xl'>You must be signed in to view this page</p>
                </div>
                <div className="flex justify-center">
                    <Button variant={'accent'} size={'large'} loading={loading} iconRight={FcGoogle} onClick={handleSignIn}>
                        Sign in
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default SignIn