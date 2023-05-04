import { FC } from 'react'
import Modal from "react-modal";
import { customStyles } from '@/components/modals/shared';
import useSearchModal from '@/hooks/useSearchModal';
import ModalHeader from '@/components/ModalHeader';
import SearchForm from '@/components/forms/SearchForm';

const SearchModal: FC = () => {
    const { isOpen, setIsOpen } = useSearchModal();

    const handleCloseRequest = () => {
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={handleCloseRequest}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Search" />
                <SearchForm/>
            </div>
        </Modal>
    )
}

export default SearchModal