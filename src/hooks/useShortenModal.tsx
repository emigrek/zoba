import { ShortenModalContext } from "@/contexts/ShortenModalContext";
import { useContext } from "react";

const useShortenModal = () => {
    const { isOpen, setIsOpen } = useContext(ShortenModalContext);
    return { isOpen, setIsOpen };
};

export default useShortenModal;