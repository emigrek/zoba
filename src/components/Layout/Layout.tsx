import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { FC, useState } from 'react'
import { BiCut, BiLogIn } from 'react-icons/bi'
import { HiQrcode } from 'react-icons/hi'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import Dropdown from '../Dropdown/Dropdown'
import { Navbar } from '../Navigation/Navbar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        await signIn("google");
    }

    return (
        <>
            <Head>
                <title>zoba</title>
                <meta name="description" content="Shorten links and manage them in fashionable way" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar className="flex justify-between items-center gap-2" size="medium">
                <div className='flex gap-5 items-center'>
                    <Link href="/">
                        <span className='text-2xl font-bold'>Zoba</span>
                    </Link>
                    <div className='flex gap-2 items-center'>
                        <Link href="/shorten">
                            <Button className="font-medium" variant="success" iconLeft={BiCut}>Shorten</Button>
                        </Link>
                        <Link href="/qr">
                            <Button className="font-medium" variant="info" iconLeft={HiQrcode}>QR</Button>
                        </Link>
                    </div>
                </div>
                <div className='flex gap-2'>
                    {session ? (
                        <Dropdown
                            trigger={
                                <div className='flex gap-4 items-center'>
                                    <div className='text-neutral-300 hidden md:block'>{session.user.name}</div>
                                    <Avatar size="small" src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} />
                                </div>
                            }
                            content={
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        { session.user.email }
                                    </div>
                                    <hr className='opacity-10' />
                                </div>
                            }
                        />
                    ) : (
                        <Button loading={loading} onClick={handleSignIn} variant="primary" iconLeft={BiLogIn}>
                            Sign in
                        </Button>
                    )}
                </div>
            </Navbar>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <Container size="small">
                    {children}
                </Container>
            </main>
        </>
    )
}

export default Layout