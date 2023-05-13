import { FC } from 'react'
import { Sidebar } from '@/components/ui/Navigation/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar } from '@/components/ui/Navigation/Navbar'
import SidebarLinkItem from '@/components/ui/Navigation/SidebarLinkItem';
import { SidebarItem } from '@/components/ui/Navigation/SidebarItem'
import Breadcrumb from '@/components/Breadcrumb'
import Brand from '@/components/Brand'
import Auth from '@/components/Auth'
import ShortenModal from '@/components/modals/ShortenModal'
import QRModal from '@/components/modals/QRModal'
import SearchModal from '@/components/modals/SearchModal'
import EditModal from '@/components/modals/EditModal'

import { dashboardSidebarConfig } from '@/config/dashboardSidebar'
import { mainSidebarConfig } from '@/config/mainSidebar'
import cn from '@/utils/cn'
import SidebarCollapseButton from '@/components/SidebarCollapseButton'
import useSidebarStore from '@/stores/sidebar'

interface LayoutProps {
    children: React.ReactNode,
    type?: 'main' | 'dashboard'
}

const Layout: FC<LayoutProps> = ({ children, type = 'main' }) => {
    const router = useRouter();
    const { open: sidebarOpen } = useSidebarStore();
    const { pathname } = router;

    const active = (path: string) => pathname === path;

    const sidebarItems = type === 'main' ? mainSidebarConfig.items : dashboardSidebarConfig.items;

    return (
        <div className='flex min-h-screen'>
            <Sidebar collapsed={sidebarOpen} className={cn('w-20 md:w-64 flex flex-col px-2 md:px-5 items-center justify-between transition duration-300')} variant={'dark'}>
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
            <main className={
                cn(sidebarOpen ? "ml-0" : "ml-20 md:ml-64", "flex flex-col flex-grow")
            }>
                <Navbar variant={'dark'}>
                    <div className="flex items-center justify-between h-full px-3 md:px-6">
                        <div className='flex gap-2 items-center'>
                            <SidebarCollapseButton />
                            <Breadcrumb />
                        </div>
                        <Auth />
                    </div>
                </Navbar>
                {children}
            </main>

            {/* Modals */}
            <ShortenModal />
            <QRModal />
            <SearchModal />
            <EditModal />
        </div>
    )
}

export default Layout