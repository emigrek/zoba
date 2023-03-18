import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { FC, useState } from 'react'
import { BiCut, BiLogIn } from 'react-icons/bi'
import { HiQrcode } from 'react-icons/hi'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
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
                <div className='flex gap-4 items-center'>
                    <Link href="/">
                        <Button className='text-2xl font-bold' variant="ghost">
                            Zoba
                        </Button>
                    </Link>
                    <div className='flex gap-2 items-center'>
                        <Link href="/shorten">
                            <Button className="font-medium" size="medium" variant="success" iconLeft={BiCut}>Shorten</Button>
                        </Link>
                        <Link href="/qr">
                            <Button className="font-medium" size="medium" variant="info" iconLeft={HiQrcode}>QR</Button>
                        </Link>
                    </div>
                </div>
                <div className='flex gap-2'>
                    {session ? (
                        <div className='flex gap-4 items-center'>
                            <div className='text-neutral-300 hidden md:block'>{session.user.name}</div>
                            <Avatar src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} />
                        </div>
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