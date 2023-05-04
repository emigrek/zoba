import { FC } from 'react'
import Modal from "react-modal";
import { Button } from '@/components/ui/Button/Button';
import useQRModal from '@/hooks/useQRModal';
import { MdClose } from 'react-icons/md';
import ModalHeader from '@/components/ModalHeader';
import QRForm from '@/components/forms/QRForm';
import { customStyles } from '@/components/modals/shared';

const QRModal: FC = () => {
    const { isOpen, setIsOpen, text } = useQRModal();

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="flex flex-col p-2 gap-5">
                <ModalHeader label="QR Code" />
                <QRForm initialText={text} />
                <div className='flex-grow mx-auto'>
                    <Button iconLeft={MdClose} onClick={() => setIsOpen(false)} variant={'red'}>Close</Button>
                </div>
            </div>
        </Modal>
    )
}

export default QRModal