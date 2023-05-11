import { create } from "zustand";

interface QrModalStore {
    open: boolean;
    text: string;
    toggle: () => void;
    setOpen: (open: boolean) => void;
    setText: (text: string) => void;
}

const useQrModalStore = create<QrModalStore>()((set) => ({
    open: false,
    text: "",
    toggle: () => set((state) => ({ open: !state.open })),
    setOpen: (open: boolean) => set({ open }),
    setText: (text: string) => set({ text })
}));

export default useQrModalStore;