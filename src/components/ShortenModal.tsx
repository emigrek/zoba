import { FC } from 'react'
import Modal from "react-modal";
import useShortenModal from '@/hooks/useShortenModal';
import ShortenForm from './forms/ShortenForm';
import { customStyles } from './QRModal';

interface ShortenModalProps { }

const ShortenModal: FC<ShortenModalProps> = () => {
    const { isOpen, setIsOpen } = useShortenModal();

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="w-96 p-2">
                <ShortenForm />
            </div>
        </Modal>
    )
}

export default ShortenModal