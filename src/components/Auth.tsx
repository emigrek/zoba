import { FC, useState } from 'react'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Button } from '@/components/ui/Button/Button'
import Spinner from '@/components/ui/Spinner/Spinner'
import { MdDashboard } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BiLogOut } from 'react-icons/bi'
import { toast } from 'react-hot-toast'

const Auth: FC = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setLoading(true);

        signIn("google", {
            callbackUrl: `${window.location.origin}/dashboard`
        }).catch(() => {
            setLoading(false);
            toast.error("Something went wrong, please try again later.", { icon: '🤔' });
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleSignOut = () => {
        toast.loading("Signing out...", { icon: '👋' });

        signOut({
            callbackUrl: `${window.location.origin}/`
        }).catch(() => {
            toast.error("Something went wrong, please try again later.", { icon: '🤔' });
        });
    }

    if (status == 'loading') {
        return (
            <div className='flex items-center gap-4 p-2'>
                <Spinner />
            </div>
        )
    }

    if (!session) {
        return (
            <Button onClick={handleSignIn} loading={loading} variant='blue' iconLeft={FcGoogle}>
                Sign in
            </Button>
        )
    }

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Avatar size={'small'} sizes={'96px'} src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name || 'User'}`} />
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.LinkItem iconLeft={MdDashboard} href="/dashboard">Dashboard</Dropdown.LinkItem>
                <Dropdown.Divider />
                <Dropdown.Item iconLeft={BiLogOut} onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown>
    )
}

export default Auth