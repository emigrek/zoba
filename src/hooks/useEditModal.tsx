import { EditModalContext } from "@/contexts/EditModalContext";
import { useContext } from "react";

const useEditModal = () => {
    const { isOpen, setIsOpen, id, setId } = useContext(EditModalContext);
    return { isOpen, setIsOpen, id, setId };
};

export default useEditModal;