import { FC } from 'react'
import Modal from "react-modal";
import { customStyles } from '@/components/modals/QRModal';
import ModalHeader from '@/components/ModalHeader';
import useEditModal from '@/hooks/useEditModal';
import EditForm from '@/components/forms/EditForm';

const EditModal: FC = () => {
    const { isOpen, setIsOpen, id } = useEditModal();

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Edit" />
                <EditForm id={id} />
            </div>
        </Modal>
    )
}

export default EditModal