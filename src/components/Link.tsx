import { Link } from '@prisma/client'
import { FC } from 'react'
import { Box } from './ui/Box/Box'
import { Button } from './ui/Button/Button'
import { BiDotsVerticalRounded, BiLinkExternal, BiTrash } from 'react-icons/bi'
import extractDomain from "extract-domain";
import Image from 'next/image'
import Dropdown from './ui/Dropdown/Dropdown'
import DropdownItem from './ui/Dropdown/DropdownItem'
import { api } from '@/utils/api'
import { toast } from 'react-hot-toast'

interface LinkProps {
    link: Link
}

const Link: FC<LinkProps> = ({
    link
}) => {
    const domain = extractDomain(link.url);
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const shortened = `${origin}/${link.slug}`;
    const created = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(link.createdAt));
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    const linkContext = api.useContext();
    const { mutateAsync: deleteLink, data } = api.link.delete.useMutation({
        onSuccess: () => {
            linkContext.link.getAll.invalidate();
            toast.success("Link deleted successfully");
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    const handleVisit = () => {
        window.open(shortened, '_blank');
    }

    const handleDelete = () => {
        deleteLink({ id: link.id });
    };

    return (
        <Box variant={'outlined'} size={'small'} className='w-full flex flex-row justify-between items-center'>
            <div className='flex items-center gap-5'>
                <div className='relative w-10 h-10'>
                    <Image src={favicon} alt={`${domain} favicon`} fill />
                </div>
                <div className='flex flex-col'>
                    <div className='font-semibold'>
                        {domain}
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
                        <DropdownItem iconLeft={BiTrash} onClick={handleDelete}>Delete</DropdownItem>
                    ]}
                />
            </div>
        </Box>
    )
}

export default Link