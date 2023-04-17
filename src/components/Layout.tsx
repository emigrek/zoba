import Head from 'next/head'
import { FC, useState } from 'react'
import { Aside } from './ui/Navigation/Aside'
import AsideLinkItem from './ui/Navigation/AsideLinkItem'
import Link from 'next/link'
import { BiCut, BiLogOut } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { Nav } from './ui/Navigation/Nav'
import Dropdown from './ui/Dropdown/Dropdown'
import { Avatar } from './ui/Avatar/Avatar'
import DropdownLinkItem from './ui/Dropdown/DropdownLinkItem'
import DropdownDivider from './ui/Dropdown/DropdownDivider'
import DropdownItem from './ui/Dropdown/DropdownItem'
import { MdDashboard } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { Button } from './ui/Button/Button'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const { pathname } = router;
    const active = (path: string) => pathname === path;

    const handleSignIn = async () => {
        setLoading(true);
        await signIn("google");
    }

    const handleSignOut = async () => {
        await signOut();
    }

    return (
        <>
            <Head>
                <title>zoba</title>
                <meta name="description" content="Shorten links and manage them in fashionable way" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex min-h-screen'>
                <Aside className='w-20 md:w-64 flex flex-col px-2 md:px-5 items-center justify-between' variant={'dark'}>
                    <div className='flex flex-col items-center w-full'>
                        <Link href="/">
                            <div className='font-bold text-xl md:text-2xl py-16 px-2 md:p-16'>
                                Zoba
                            </div>
                        </Link>
                        <AsideLinkItem variant={active("/shorten") ? 'active' : 'transparent'} iconLeft={BiCut} href="/shorten" size={'large'}>
                            Shorten
                        </AsideLinkItem>
                    </div>
                </Aside>
                <main className="flex flex-col flex-grow ml-20 md:ml-64">
                    <Nav variant={'dark'}>
                        <div className="flex items-center justify-between h-full px-6">
                            <div>
                            </div>
                            <div className="flex items-center gap-4">
                                {
                                    session ? (
                                        <Dropdown
                                            trigger={
                                                <div className='flex items-center gap-4'>
                                                    <span className='hidden md:block text-neutral-300 text-sm'>{session.user.name}</span>
                                                    <Avatar size={'small'} src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} />
                                                </div>
                                            }
                                            items={[
                                                <DropdownLinkItem iconLeft={MdDashboard} href="/dashboard">Dashboard</DropdownLinkItem>,
                                                <DropdownDivider />,
                                                <DropdownItem iconLeft={BiLogOut} onClick={handleSignOut}>Sign out</DropdownItem>
                                            ]}
                                        />
                                    ) : (
                                        <Button onClick={handleSignIn} loading={loading} variant='blue' iconLeft={FcGoogle}>
                                            <span className='hidden md:block'>Sign in</span>
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    </Nav>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout