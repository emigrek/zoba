import { forwardRef } from 'react'
import { Sheet } from '@/components/ui/Sheet/Sheet'
import { Button } from '@/components/ui/Button/Button'
import { BiCopy, BiDotsVerticalRounded, BiEdit, BiQr, BiTrash } from 'react-icons/bi'
import Image from 'next/image'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { api } from '@/utils/api'
import { toast } from 'react-hot-toast'
import useLinkDetails from '@/hooks/useLinkDetails'
import { ExtendedLink } from 'types'
import useQRModal from '@/hooks/useQRModal'
import useEditModal from '@/hooks/useEditModal'
import pluralize from 'pluralize';

interface LinkItemProps {
    link: ExtendedLink
}

const LinkItem = forwardRef<HTMLDivElement, LinkItemProps>(({ link }, ref) => {
    const { domain, shortened, created, favicon } = useLinkDetails({ link });

    const { setIsOpen: setQRModalOpen, setText: setQRModalText } = useQRModal();
    const { setIsOpen: setEditModalOpen, setId: setEditModalLinkId } = useEditModal();
    
    const linkContext = api.useContext();
    const { mutateAsync: deleteLink } = api.link.delete.useMutation({
        onSuccess: () => {
            linkContext.link.invalidate();
            toast.success("Link deleted successfully", { icon: '🥳' });
        }
    });

    const handleEdit = () => {
        setEditModalOpen(true);
        setEditModalLinkId(link.id);
    };

    const handleClipboard = () => {
        try {
            navigator.clipboard.writeText(shortened);
            toast.success("Copied to clipboard", { icon: '📋' });
        } catch (error) {
            toast.error("Something went wrong", { icon: '🤔' });
        }
    };

    const handleShowQR = () => {
        setQRModalOpen(true);
        setQRModalText(shortened);
    };

    const handleDelete = async () => {
        try {
            await deleteLink({ id: link.id });
        } catch (error) {
            toast.error("Something went wrong", { icon: '🤔' });
        }
    };

    return (
        <Sheet ref={ref} size={'small'} className='w-full flex flex-row justify-between items-center'>
            <div className='flex items-center gap-5'>
                <div className='relative w-10 h-10 md:w-14 md:h-14'>
                    <Image src={favicon} alt={`${domain} favicon`} fill sizes="128" />
                </div>
                <div className='flex flex-col'>
                    <div className='font-semibold text-md md:text-lg'>
                        {domain}
                    </div>
                    <div className='text-sm md:text-md text-neutral-300 tracking-wide'>
                        {pluralize('visit', link.visits.length, true)}
                    </div>
                    <div className='text-neutral-500 text-xs md:text-sm'>
                        {created}
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <Dropdown>
                    <Dropdown.Trigger>
                        <Button variant={'transparent'} iconRight={BiDotsVerticalRounded} />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item iconLeft={BiEdit} onClick={handleEdit}>Edit</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item iconLeft={BiCopy} onClick={handleClipboard}>Copy to clipboard</Dropdown.Item>
                        <Dropdown.Item iconLeft={BiQr} onClick={handleShowQR}>Show QR</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item iconLeft={BiTrash} onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </Sheet>
    )
})

export default LinkItem