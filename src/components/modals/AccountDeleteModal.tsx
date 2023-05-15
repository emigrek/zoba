import { FC } from 'react'
import Modal from "react-modal";
import { customStyles } from '@/components/modals/shared';
import ModalHeader from '@/components/ModalHeader';
import useAccountDeleteModalStore from '@/stores/accountDeleteModal';
import AccountDeleteForm from '@/components/forms/AccountDeleteForm';

const AccountDeleteModal: FC = () => {
    const { open, toggle } = useAccountDeleteModalStore();

    return (
        <Modal isOpen={open} style={customStyles} onRequestClose={toggle}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Delete account" className='text-red-400' />
                <AccountDeleteForm />
            </div>
        </Modal>
    )
}

export default AccountDeleteModal;