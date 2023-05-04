import { FC } from 'react'
import Modal from "react-modal";
import useShortenModal from '@/hooks/useShortenModal';
import ShortenForm from '@/components/forms/ShortenForm';
import { customStyles } from '@/components/modals/shared';
import ModalHeader from '@/components/ModalHeader';

const ShortenModal: FC = () => {
    const { isOpen, setIsOpen } = useShortenModal();

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Shorten" />
                <ShortenForm />
            </div>
        </Modal>
    )
}

export default ShortenModal