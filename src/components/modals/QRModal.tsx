import { FC } from 'react'
import Modal from "react-modal";
import { Button } from '@/components/ui/Button/Button';
import ModalHeader from '@/components/ModalHeader';
import QRForm from '@/components/forms/QRForm';
import { customStyles } from '@/components/modals/shared';
import useQrModalStore from '@/stores/qrModal';

const QRModal: FC = () => {
    const { open, toggle, text } = useQrModalStore();

    return (
        <Modal isOpen={open} style={customStyles} onRequestClose={toggle}>
            <div className="flex flex-col p-2 gap-5 max-w-2xl">
                <ModalHeader label="QR Code" />
                <QRForm initialText={text}/>
                <div className='flex-grow mx-auto'>
                    <Button onClick={toggle} variant={'transparent'}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default QRModal