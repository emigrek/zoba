import { useSession } from 'next-auth/react'
import { FC } from 'react'
import Spinner from '@/components/ui/Spinner/Spinner';
import ErrorFallback from '@/components/ErrorFallback';
import { Avatar } from './ui/Avatar/Avatar';
import { Sheet } from './ui/Sheet/Sheet';

const AccountDetails: FC = () => {
    const { data: session, status } = useSession();

    if (status == 'loading')
        return <div className='flex items-center justify-center'><Spinner /></div>

    if (!session)
        return <ErrorFallback />

    return (
        <Sheet className='w-full flex flex-col-reverse md:flex-row md:justify-between md:items-center'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <span className='text-neutral-300'>Name</span>
                    <span className='text-neutral-500'>{session.user.name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-neutral-300'>Email</span>
                    <span className='text-neutral-500'>{session.user.email}</span>
                </div>
            </div>
            <div className='mx-auto mb-5 md:mx-0 md:mb-0'>
                <Avatar size={'xlarge'} sizes={'96px'} src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name || 'User'}`} />
            </div>
        </Sheet>
    )
}

export default AccountDetails