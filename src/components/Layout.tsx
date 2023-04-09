import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { FC, useContext, useState } from 'react'
import { BiCut, BiLogIn } from 'react-icons/bi'
import { HiQrcode } from 'react-icons/hi'
import { MdDashboard, MdLogout } from 'react-icons/md'
import { Avatar } from './ui/Avatar/Avatar'
import { Button } from './ui/Button/Button'
import { Container } from './ui/Container/Container'
import Dropdown from './ui/Dropdown/Dropdown'
import DropdownDivider from './ui/Dropdown/DropdownDivider'
import DropdownItem from './ui/Dropdown/DropdownItem'
import { Navbar } from './ui/Navigation/Navbar'
import { GoThreeBars } from "react-icons/go";
import Drawer from './ui/Drawer/Drawer'
import useDrawer from '@/hooks/useDrawer'
import DropdownLinkItem from './ui/Dropdown/DropdownLinkItem'
import DrawerLinkItem from './ui/Drawer/DrawerLinkItem'
import { FcGoogle } from 'react-icons/fc'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { data: session } = useSession();
    const { drawer, setDrawer } = useDrawer();
    const [loading, setLoading] = useState(false);

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
            <Navbar className="flex justify-between items-center gap-2" size="medium">
                <div className='gap-2 items-center flex'>
                    <div className='items-center flex md:hidden'>
                        <Button onClick={() => setDrawer(!drawer)} variant={'transparent'} iconLeft={GoThreeBars} />
                    </div>
                    <Link href="/">
                        <span className='text-2xl font-bold'>Zoba</span>
                    </Link>
                    <div className='hidden md:flex gap-2 ml-4 items-center'>
                        <Link href="/shorten">
                            <Button className="font-medium" variant={'emerald'} iconLeft={BiCut}>Shorten</Button>
                        </Link>
                    </div>
                </div>
                {
                    <div className='flex gap-2'>
                        {session ? (
                            <Dropdown
                                trigger={
                                    <div className='flex gap-4 items-center'>
                                        <div className='text-neutral-300 hidden md:block'>{session.user.name}</div>
                                        <Avatar size="small" src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} />
                                    </div>
                                }
                            >
                                <DropdownLinkItem iconLeft={MdDashboard} href="/dashboard">
                                    Dashboard
                                </DropdownLinkItem>
                                <DropdownDivider />
                                <DropdownItem iconLeft={MdLogout} onClick={handleSignOut}>
                                    Sign out
                                </DropdownItem>
                            </Dropdown>
                        ) : (
                            <Button loading={loading} onClick={handleSignIn} variant="blue" iconLeft={FcGoogle}>
                                Sign in
                            </Button>
                        )}
                    </div>
                }
            </Navbar>
            <Drawer
                open={drawer}
                onClickOutside={() => setDrawer(false)}
            >
                <div className='h-screen flex flex-col justify-between text-white p-5 items-center'>
                    <div className='flex flex-col items-center justify-center gap-2 w-full mt-14'>
                        <DrawerLinkItem variant={'emerald'} iconLeft={BiCut} href="/shorten">
                            Shorten
                        </DrawerLinkItem>
                    </div>
                </div>
            </Drawer>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <Container size="small">
                    {children}
                </Container>
            </main>
        </>
    )
}

export default Layout