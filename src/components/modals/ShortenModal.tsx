import { FC } from 'react'
import Modal from "react-modal";
import ShortenForm from '@/components/forms/ShortenForm';
import { customStyles } from '@/components/modals/shared';
import ModalHeader from '@/components/ModalHeader';
import useShortenModalStore from '@/stores/shortenModal';

const ShortenModal: FC = () => {
    const { open, toggle } = useShortenModalStore();

    return (
        <Modal isOpen={open} style={customStyles} onRequestClose={toggle}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Shorten" />
                <ShortenForm />
            </div>
        </Modal>
    )
}

export default ShortenModal