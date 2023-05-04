import { QRModalContext } from "@/contexts/QRModalContext";
import { useContext } from "react";

const useQRModal = () => {
    const { isOpen, setIsOpen, text, setText } = useContext(QRModalContext);
    return { isOpen, setIsOpen, text, setText };
};

export default useQRModal;