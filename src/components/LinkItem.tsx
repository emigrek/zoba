import { forwardRef } from 'react'
import { Sheet } from './ui/Sheet/Sheet'
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
        <Sheet ref={ref} size={'small'} className='w-full flex flex-row justify-between items-center'>
            <div className='flex items-center gap-5'>
                <div className='relative w-12 h-12'>
                    <Image src={favicon} alt={`${domain} favicon`} fill sizes="128" />
                </div>
                <div className='flex flex-col'>
                    <div className='font-semibold text-lg'>
                        {domain}
                    </div>
                    <div className='uppercase text-sm text-neutral-300 tracking-wide'>
                        {link.visits.length} visits
                    </div>
                    <div className='text-neutral-400 text-sm mt-1'>
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
        </Sheet>
    )
})

export default LinkItem