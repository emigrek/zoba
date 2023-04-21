import { FC, useState } from 'react'
import Modal from "react-modal";
import { Button } from './ui/Button/Button';
import useQRModal from '@/hooks/useQRModal';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { VscLoading } from 'react-icons/vsc';
import QRCode from "react-qr-code";

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

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
            <div className="flex flex-col p-2 gap-5 items-center">
                <div className='relative aspect-square'>
                    <QRCode className='m-auto' value={url} size={300} bgColor="#262626" fgColor="#fff" />
                </div>
                <div className='flex-grow'>
                    <Button iconLeft={MdClose} onClick={() => setIsOpen(false)} variant={'red'}>Close</Button>
                </div>
            </div>
        </Modal>
    )
}

export default QRModal