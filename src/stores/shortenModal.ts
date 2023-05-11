import { create } from "zustand";

interface ShortenModalStore {
    open: boolean;
    toggle: () => void;
    setOpen: (open: boolean) => void;
}

const useShortenModalStore = create<ShortenModalStore>()((set) => ({
    open: false,
    toggle: () => set((state) => ({ open: !state.open })),
    setOpen: (open: boolean) => set({ open }),
}));

export default useShortenModalStore;