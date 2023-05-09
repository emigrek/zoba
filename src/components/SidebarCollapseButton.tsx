import { FC } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import useSidebar from '@/hooks/useSidebar'

const SidebarCollapseButton: FC = () => {
    const { collapsed, toggle } = useSidebar();

    return (
        <button onClick={toggle} className='rounded-full text-neutral-200 p-2'>
            {collapsed ? <MdChevronRight className="w-6 h-6" /> : <MdChevronLeft className="w-6 h-6" />}
        </button>
    )
}

export default SidebarCollapseButton