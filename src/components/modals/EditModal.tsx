import { FC } from 'react'
import Modal from "react-modal";
import ModalHeader from '@/components/ModalHeader';
import EditForm from '@/components/forms/EditForm';
import { customStyles } from '@/components/modals/shared';
import useEditModalStore from '@/stores/editModal';

const EditModal: FC = () => {
    const { open, toggle } = useEditModalStore();

    return (
        <Modal isOpen={open} style={customStyles} onRequestClose={toggle}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Edit" />
                <EditForm />
            </div>
        </Modal>
    )
}

export default EditModal