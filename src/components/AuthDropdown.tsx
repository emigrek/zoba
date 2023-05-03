import { FC, useState } from 'react'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import DropdownLinkItem from '@/components/ui/Dropdown/DropdownLinkItem'
import DropdownDivider from '@/components/ui/Dropdown/DropdownDivider'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { Button } from '@/components/ui/Button/Button'
import Spinner from '@/components/ui/Spinner/Spinner'
import { MdDashboard } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BiLogOut } from 'react-icons/bi'

const AuthDropdown: FC = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        await signIn("google", {
            callbackUrl: `${window.location.origin}/dashboard`
        });
    }

    const handleSignOut = async () => {
        await signOut({
            callbackUrl: `${window.location.origin}/`
        });
    }

    if (status == 'loading') {
        return (
            <div className='flex items-center gap-4 p-2'>
                <Spinner/>
            </div>
        )
    }

    if (!session) {
        return (
            <Button onClick={handleSignIn} loading={loading} variant='blue' iconLeft={FcGoogle}>
                <span className='hidden md:block'>Sign in</span>
            </Button>
        )
    }

    return (
        <Dropdown
            trigger={
                <div className='flex items-center gap-4'>
                    <Avatar size={'small'} src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} />
                </div>
            }
            items={[
                <DropdownLinkItem iconLeft={MdDashboard} href="/dashboard">Dashboard</DropdownLinkItem>,
                <DropdownDivider />,
                <DropdownItem iconLeft={BiLogOut} onClick={handleSignOut}>Sign out</DropdownItem>
            ]}
        />
    )
}

export default AuthDropdown