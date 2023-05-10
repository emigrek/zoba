import { HTMLAttributes } from 'react'
import DropdownContextProvider from './DropdownContext';
import DropdownTrigger from './DropdownTrigger';
import DropdownContent from './DropdownContent';
import DropdownLinkItem from './DropdownLinkItem';
import DropdownItem from './DropdownItem';
import DropdownDivider from './DropdownDivider';

type DropdownProps = HTMLAttributes<HTMLDivElement>

function Dropdown ({
    children
}: DropdownProps) {
    return (
        <DropdownContextProvider>
            <div className='relative'>{children}</div>
        </DropdownContextProvider>
    )
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.LinkItem = DropdownLinkItem;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown