import { FC, useState } from 'react'
import { Sidebar } from '@/components/ui/Navigation/Sidebar'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { Navbar } from '@/components/ui/Navigation/Navbar'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import DropdownLinkItem from '@/components/ui/Dropdown/DropdownLinkItem'
import DropdownDivider from '@/components/ui/Dropdown/DropdownDivider'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { MdDashboard } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/Button/Button'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import SidebarLinkItem from '@/components/ui/Navigation/SidebarLinkItem';
import { mainSidebarConfig } from '@/config/mainSidebar'
import { SidebarItem } from '../ui/Navigation/SidebarItem'
import Breadcrumb from '@/components/Breadcrumb'
import Brand from '../Brand'

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
        <div className='flex min-h-screen'>
            <Sidebar className='w-20 md:w-64 flex flex-col px-2 md:px-5 items-center justify-between' variant={'dark'}>
                <div className='flex flex-col items-center w-full gap-1'>
                    <Link href="/">
                        <Brand/>
                    </Link>
                    <div className='w-full h-1 border-b border-neutral-800 mb-2'/>
                    {
                        mainSidebarConfig.items.map((item, index) => {
                            if (item.href) {
                                return (
                                    <SidebarLinkItem
                                        key={index}
                                        href={item.href}
                                        iconLeft={item.icon}
                                        variant={active(item.href) ? 'active' : 'transparent'}
                                        size={'large'}
                                    >
                                        {item.name}
                                    </SidebarLinkItem>
                                )
                            } else {
                                return (
                                    <SidebarItem
                                        key={index}
                                        iconLeft={item.icon}
                                        variant={active(item.href) ? 'active' : 'transparent'}
                                        size={'large'}
                                    >
                                        {item.name}
                                    </SidebarItem>
                                )
                            }
                        })
                    }
                </div>
            </Sidebar>
            <main className="flex flex-col flex-grow ml-20 md:ml-64">
                <Navbar variant={'dark'}>
                    <div className="flex items-center justify-between h-full px-6">
                        <Breadcrumb/>
                        <div className="flex items-center gap-4">
                            {
                                session ? (
                                    <Dropdown
                                        trigger={
                                            <div className='flex items-center gap-4'>
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
                </Navbar>
                {children}
            </main>
        </div>
    )
}

export default Layout