import useSidebar from '@/hooks/useSidebar'
import { FC } from 'react'
import { Button } from '@/components/ui/Button/Button';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const SidebarCollapseButton: FC = () => {
    const { collapsed, toggle } = useSidebar();

    return (
        <Button 
            onClick={toggle}
            className='rounded-full'
            variant={'transparent'}
            iconLeft={collapsed ? MdChevronRight : MdChevronLeft }
        />
    )
}

export default SidebarCollapseButton