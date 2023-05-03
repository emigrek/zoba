import { FC } from 'react'
import Modal from "react-modal";
import { Button } from '../ui/Button/Button';
import useQRModal from '@/hooks/useQRModal';
import { MdClose } from 'react-icons/md';
import ModalHeader from '@/components/ModalHeader';
import QRForm from '@/components/forms/QRForm';

export const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#171717',
        border: 'none',
        borderRadius: '0.75rem'
    },
};

interface QRModalProps {}

const QRModal: FC<QRModalProps> = () => {
    const { isOpen, setIsOpen, url } = useQRModal();

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="flex flex-col p-2 gap-5">
                <ModalHeader label="QR Code" />
                <QRForm initialText={url} />
                <div className='flex-grow mx-auto'>
                    <Button iconLeft={MdClose} onClick={() => setIsOpen(false)} variant={'red'}>Close</Button>
                </div>
            </div>
        </Modal>
    )
}

export default QRModal