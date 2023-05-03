import { FC } from 'react'
import { Sidebar } from '@/components/ui/Navigation/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar } from '@/components/ui/Navigation/Navbar'
import SidebarLinkItem from '@/components/ui/Navigation/SidebarLinkItem';
import { SidebarItem } from '@/components/ui/Navigation/SidebarItem'
import Breadcrumb from '@/components/Breadcrumb'
import Brand from '@/components/Brand'
import AuthDropdown from '@/components/AuthDropdown'

import { dashboardSidebarConfig } from '@/config/dashboardSidebar'
import { mainSidebarConfig } from '@/config/mainSidebar'

interface LayoutProps {
    children: React.ReactNode,
    type?: 'main' | 'dashboard'
}

const Layout: FC<LayoutProps> = ({ children, type = 'main' }) => {
    const router = useRouter();
    const { pathname } = router;

    const active = (path: string) => pathname === path;

    const sidebarItems = type === 'main' ? mainSidebarConfig.items : dashboardSidebarConfig.items;

    return (
        <div className='flex min-h-screen'>
            <Sidebar className='w-20 md:w-64 flex flex-col px-2 md:px-5 items-center justify-between' variant={'dark'}>
                <div className='flex flex-col items-center w-full gap-1'>
                    <Link href="/">
                        <Brand />
                    </Link>
                    <div className='w-full h-1 border-b border-neutral-800 mb-2' />
                    {
                        sidebarItems.map((item, index) => {
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
                        <Breadcrumb />
                        <AuthDropdown/>
                    </div>
                </Navbar>
                {children}
            </main>
        </div>
    )
}

export default Layout