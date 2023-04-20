import { FC, useState } from 'react'
import Modal from "react-modal";
import { Button } from './ui/Button/Button';
import useQRModal from '@/hooks/useQRModal';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { VscLoading } from 'react-icons/vsc';

const customStyles = {
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
        backgroundColor: '#262626',
        border: 'none',
    },
};

interface QRModalProps { }

const QRModal: FC<QRModalProps> = () => {
    const { isOpen, setIsOpen, url } = useQRModal();
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="flex flex-col p-2 gap-5 items-center">
                <div className='relative aspect-square w-80 md:w-96'>
                    {
                        loading ? (
                            <div className='absolute inset-0 w-full h-full flex items-center justify-center bg-neutral-800 z-[51]'>
                                <VscLoading className="animate-spin w-14 h-14 fill-white" />
                            </div>
                        ) : null
                    }
                    <Image onLoad={() => setLoading(false)} fill src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${url}`} alt="QR Code" />
                </div>
                <div className='flex-grow'>
                    <Button iconLeft={MdClose} onClick={() => setIsOpen(false)} variant={'red'}>Close</Button>
                </div>
            </div>
        </Modal>
    )
}

export default QRModal