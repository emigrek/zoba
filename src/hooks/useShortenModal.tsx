import { ShortenModalContext } from "@/contexts/ShortenModalContext";
import { useContext } from "react";

const useShortenModal = () => {
    const context = useContext(ShortenModalContext);
    return context;
};

export default useShortenModal;