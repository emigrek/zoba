import { QRModalContext } from "@/contexts/QRModalContext";
import { useContext } from "react";

const useQRModal = () => {
    const { isOpen, setIsOpen, url, setUrl } = useContext(QRModalContext);
    return { isOpen, setIsOpen, url, setUrl };
};

export default useQRModal;