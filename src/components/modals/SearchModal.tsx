import { FC } from 'react'
import Modal from "react-modal";
import { customStyles } from '@/components/modals/shared';
import ModalHeader from '@/components/ModalHeader';
import SearchForm from '@/components/forms/SearchForm';
import useSearchModalStore from '@/stores/searchModal';

const SearchModal: FC = () => {
    const { open, toggle } = useSearchModalStore();

    return (
        <Modal isOpen={open} style={customStyles} onRequestClose={toggle}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Search" />
                <SearchForm/>
            </div>
        </Modal>
    )
}

export default SearchModal