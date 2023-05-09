import { SearchModalContext } from "@/contexts/SearchModalContext";
import { useContext } from "react";

const useSearchModal = () => {
    const context = useContext(SearchModalContext);
    return context;
};

export default useSearchModal;