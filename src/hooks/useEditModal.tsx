import { EditModalContext } from "@/contexts/EditModalContext";
import { useContext } from "react";

const useEditModal = () => {
    const context = useContext(EditModalContext);
    return context;
};

export default useEditModal;