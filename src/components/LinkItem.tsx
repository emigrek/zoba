import { FC, forwardRef } from 'react'
import { Box } from './ui/Box/Box'
import { Button } from './ui/Button/Button'
import { BiDotsVerticalRounded, BiLinkExternal, BiQr, BiTrash } from 'react-icons/bi'
import Image from 'next/image'
import Dropdown from './ui/Dropdown/Dropdown'
import DropdownItem from './ui/Dropdown/DropdownItem'
import { api } from '@/utils/api'
import { toast } from 'react-hot-toast'
import useLinkDetails from '@/hooks/useLinkDetails'
import { ExtendedLink } from 'types'
import useQRModal from '@/hooks/useQRModal'

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
            toast.success("Link deleted successfully");
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    const handleVisit = () => {
        window.open(shortened, '_blank');
    }

    const handleShowQR = () => {
        setIsOpen(true);
        setUrl(shortened);
    };

    const handleDelete = () => {
        deleteLink({ id: link.id });
    };

    return (
        <Box ref={ref} variant={'outlined'} size={'small'} className='w-full flex flex-row justify-between items-center'>
            <div className='flex items-center gap-5'>
                <div className='relative w-10 h-10'>
                    <Image src={favicon} alt={`${domain} favicon`} fill sizes="64" />
                </div>
                <div className='flex flex-col'>
                    <div className='font-semibold text-lg'>
                        {domain}
                    </div>
                    <div>
                        {link.visits.length} visits
                    </div>
                    <div className='text-neutral-400'>
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
                        <DropdownItem iconLeft={BiQr} onClick={handleShowQR}>Show QR</DropdownItem>,
                        <DropdownItem iconLeft={BiTrash} onClick={handleDelete}>Delete</DropdownItem>
                    ]}
                />
            </div>
        </Box>
    )
})

export default LinkItem