import { FC } from 'react'
import Modal from "react-modal";
import { customStyles } from '@/components/modals/QRModal';
import useSearchModal from '@/hooks/useSearchModal';
import { Input } from '@/components/ui/Input/Input';
import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { BiSearch } from 'react-icons/bi';
import ModalHeader from '@/components/ModalHeader';

interface SearchModalProps { }

const SearchModal: FC<SearchModalProps> = () => {
    const { isOpen, setIsOpen, setQuery } = useSearchModal();
    const [search, setSearch] = useState<string>('');

    // TODO
    // Move code below to SearchForm
    // Use react-hook-form
    // revalidate on submit

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        setIsOpen(false);
        setQuery(search);
        setSearch('');
    }

    const handleCloseRequest = () => {
        setIsOpen(false);
        setSearch('');
    }

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={handleCloseRequest}>
            <div className="w-80 md:w-96 p-2 flex flex-col gap-5">
                <ModalHeader label="Search" />
                <Input
                    placeholder="Enter search phrase"
                    value={search}
                    onKeyDown={(e) => handleEnter(e)}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex justify-end items-center mt-3 gap-2">
                    <Button onClick={() => setIsOpen(false)} type="button" size={'large'} variant={'transparent'}>
                        Cancel
                    </Button>
                    <Button
                        variant="accent"
                        onClick={() => {
                            setIsOpen(false);
                            setQuery(search);
                            setSearch('');
                        }}
                        className='w-32'
                        size={'large'}
                        iconRight={BiSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default SearchModal