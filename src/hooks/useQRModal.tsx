import { QRModalContext } from "@/contexts/QRModalContext";
import { useContext } from "react";

const useQRModal = () => {
    const context = useContext(QRModalContext);
    return context;
};

export default useQRModal;