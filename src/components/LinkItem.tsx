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
import pluralize from 'pluralize';
import useEditModalStore from '@/stores/editModal'
import useQrModalStore from '@/stores/qrModal'
import { IoEyeOff } from 'react-icons/io5'

interface LinkItemProps {
    link: ExtendedLink
}

const LinkItem = forwardRef<HTMLDivElement, LinkItemProps>(({ link }, ref) => {
    const { domain, shortened, created, favicon, visits } = useLinkDetails({ link });

    const { toggle: toggleEditModal, setId: setEditModalLinkId } = useEditModalStore();
    const { toggle: toggleQrModal, setText } = useQrModalStore();

    const linkContext = api.useContext();
    const { mutateAsync: deleteLink } = api.link.delete.useMutation({
        onSuccess: () => {
            linkContext.link.invalidate().catch(() => {
                toast.error("Something went wrong during reinvalidation", { icon: '🤔' });
            });
            toast.success("Link deleted successfully", { icon: '🥳' });
        }
    });
    const { mutateAsync: deleteVisits } = api.visit.deleteVisits.useMutation({
        onSuccess: () => {
            linkContext.link.invalidate().catch(() => {
                toast.error("Something went wrong during reinvalidation", { icon: '🤔' });
            });
            toast.success("Visits deleted successfully", { icon: '🥳' });
        }
    });

    const handleEdit = () => {
        setEditModalLinkId(link.id);
        toggleEditModal();
    };

    const handleClipboard = () => {
        navigator.clipboard.writeText(shortened).catch(() => {
            toast.error("Something went wrong", { icon: '🤔' });
        }).finally(() => {
            toast.success("Copied to clipboard", { icon: '📋' });
        });
    };

    const handleShowQR = () => {
        setText(shortened);
        toggleQrModal();
    };

    const handleDeleteVisits = () => {
        deleteVisits({ id: link.id }).catch(() => {
            toast.error("Something went wrong", { icon: '🤔' });
        });
    }


    const handleDelete = () => {
        deleteLink({ id: link.id }).catch(() => {
            toast.error("Something went wrong", { icon: '🤔' });
        });
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
                        {visits} {pluralize('visit', link.visits.length, false)}
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
                        <Dropdown.Divider />
                        <Dropdown.Item iconLeft={BiCopy} onClick={handleClipboard}>Copy to clipboard</Dropdown.Item>
                        <Dropdown.Item iconLeft={BiQr} onClick={handleShowQR}>Show QR</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item iconLeft={IoEyeOff} onClick={handleDeleteVisits}>Clear visits</Dropdown.Item>
                        <Dropdown.Item iconLeft={BiTrash} onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </Sheet>
    )
})

LinkItem.displayName = 'LinkItem';

export default LinkItem