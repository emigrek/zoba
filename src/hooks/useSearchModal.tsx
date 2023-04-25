import { SearchModalContext } from "@/contexts/SearchModalContext";
import { useContext } from "react";

const useSearchModal = () => {
    const { isOpen, setIsOpen, query, setQuery } = useContext(SearchModalContext);
    return { isOpen, setIsOpen, query, setQuery };
};

export default useSearchModal;