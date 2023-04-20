import { FC } from 'react'
import Modal from "react-modal";
import { Button } from './ui/Button/Button';
import useQRModal from '@/hooks/useQRModal';

const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#262626',
        border: 'none',
    },
};

interface QRModalProps { }

const QRModal: FC<QRModalProps> = () => {
    const { isOpen, setIsOpen, url, setUrl } = useQRModal();

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="flex flex-col p-2 gap-5 items-center">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${url}`} alt="QR Code" />
                <div className='flex-grow py-1'>
                    <Button onClick={() => setIsOpen(false)} variant={'red'}>Close</Button>
                </div>
            </div>
        </Modal>
    )
}

export default QRModal