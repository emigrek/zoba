import { useForm } from 'react-hook-form';
import { FC } from 'react'
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import useAccountDeleteStore from '@/stores/accountDeleteModal';
import { useSession } from 'next-auth/react';
import FormError from '@/components/FormError';
import { toast } from 'react-hot-toast';
import { api } from '@/utils/api';
import { TRPCClientError } from '@trpc/client';
import Spinner from '@/components/ui/Spinner/Spinner';
import { BiTrash } from 'react-icons/bi';

const AccountDeleteForm: FC = ({ }) => {
    const { data: session, status } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { toggle: toggleAccountDeleteModal } = useAccountDeleteStore();

    const { mutateAsync: deleteAccount, isLoading: isMutating } = api.account.delete.useMutation({
        onSuccess: () => {
            toast.success("Account deleted", { icon: '👋' });
            toggleAccountDeleteModal();
        }
    });

    const onSubmit = () => {
        deleteAccount().catch((error) => {
            if (error instanceof TRPCClientError) {
                const { message } = error;
                toast.error(message, { icon: '🤔' });
            }
        }).finally(() => {
            location.reload();
        });
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col md:flex-row gap-5 flex-grow justify-center py-10">
                <Spinner className="w-8 h-8" />
            </div>
        )
    }

    if (!session) {
        return (
            <div className="flex flex-col gap-2 flex-grow justify-center items-center py-10">
                <p className="text-3xl">😨</p>
                <p className="text-neutral-400">You need to be logged in order to delete your account.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400">Account name (<span className='bg-neutral-800'>{session.user.name}</span>)</p>
                <Input id="name" placeholder="Please enter your account name" {...register("name", {
                    required: 'Account name is required',
                    validate: (value) => value === session.user.name || 'Account name does not match'
                })} />
                {errors.name && <FormError>{errors.name.message as string}</FormError>}
            </div>
            <div className="text-neutral-500">
                Deleting your account is permanent. All of your data will be deleted and you won&apos;t be able to recover it.
            </div>
            <div className="flex justify-end items-center mt-3 gap-2">
                <Button onClick={toggleAccountDeleteModal} type="button" size={'large'} variant={'transparent'}>
                    Cancel
                </Button>
                <Button className="w-32" loading={isMutating} type="submit" size={'large'} variant={'red'} iconRight={BiTrash}>
                    Delete
                </Button>
            </div>
        </form>
    )
}

export default AccountDeleteForm