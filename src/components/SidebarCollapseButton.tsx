import { FC } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import useSidebarStore from '@/stores/sidebar';

const SidebarCollapseButton: FC = () => {
    const { open, toggle } = useSidebarStore();

    return (
        <button onClick={toggle} className='rounded-full text-neutral-200 p-2'>
            {open ? <MdChevronRight className="w-6 h-6" /> : <MdChevronLeft className="w-6 h-6" />}
        </button>
    )
}

export default SidebarCollapseButton