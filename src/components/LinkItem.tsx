import { forwardRef } from 'react'
import { Sheet } from './ui/Sheet/Sheet'
import { Button } from './ui/Button/Button'
import { BiCopy, BiDotsVerticalRounded, BiLinkExternal, BiQr, BiTrash } from 'react-icons/bi'
import Image from 'next/image'
import Dropdown from './ui/Dropdown/Dropdown'
import DropdownItem from './ui/Dropdown/DropdownItem'
import { api } from '@/utils/api'
import { toast } from 'react-hot-toast'
import useLinkDetails from '@/hooks/useLinkDetails'
import { ExtendedLink } from 'types'
import useQRModal from '@/hooks/useQRModal'
import DropdownDivider from '@/components/ui/Dropdown/DropdownDivider'

interface LinkItemProps {
    link: ExtendedLink
}

const LinkItem = forwardRef<HTMLDivElement, LinkItemProps>(({ link }, ref) => {
    const { domain, shortened, created, favicon } = useLinkDetails({ link });
    const { setIsOpen, setUrl } = useQRModal();
    const linkContext = api.useContext();
    const { mutateAsync: deleteLink, data } = api.link.delete.useMutation({
        onSuccess: () => {
            linkContext.link.getInfinite.invalidate();
            toast.success("Link deleted successfully", { icon: '🥳' });
        },
        onError: () => {
            toast.error("Something went wrong", { icon: '🤔' });
        }
    });

    const handleVisit = () => {
        window.open(shortened, '_blank');
    }

    const handleClipboard = () => {
        try {
            navigator.clipboard.writeText(shortened);
            toast.success("Copied to clipboard", { icon: '📋' });
        } catch (error) {
            toast.error("Something went wrong", { icon: '🤔' });
        }
    };

    const handleShowQR = () => {
        setIsOpen(true);
        setUrl(shortened);
    };

    const handleDelete = () => {
        deleteLink({ id: link.id });
    };

    return (
        <Sheet ref={ref} size={'small'} className='w-full flex flex-row justify-between items-center'>
            <div className='flex items-center gap-5'>
                <div className='relative w-12 h-12'>
                    <Image src={favicon} alt={`${domain} favicon`} fill sizes="128" />
                </div>
                <div className='flex flex-col'>
                    <div className='font-semibold text-lg'>
                        {domain}
                    </div>
                    <div className='text-sm text-neutral-300 tracking-wide'>
                        {link.visits.length} visits
                    </div>
                    <div className='text-neutral-500 text-sm'>
                        {created}
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <Dropdown
                    trigger={
                        <Button variant={'transparent'} iconRight={BiDotsVerticalRounded} />
                    }
                    items={[
                        <DropdownItem iconLeft={BiLinkExternal} onClick={handleVisit}>Visit</DropdownItem>,
                        <DropdownItem iconLeft={BiCopy} onClick={handleClipboard}>Copy to clipboard</DropdownItem>,
                        <DropdownItem iconLeft={BiQr} onClick={handleShowQR}>Show QR</DropdownItem>,
                        <DropdownDivider/>,
                        <DropdownItem iconLeft={BiTrash} onClick={handleDelete}>Delete</DropdownItem>
                    ]}
                />
            </div>
        </Sheet>
    )
})

export default LinkItem