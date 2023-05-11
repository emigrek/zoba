import { create } from "zustand";

interface EditModalStore {
    open: boolean;
    id: string;
    toggle: () => void;
    setOpen: (open: boolean) => void;
    setId: (id: string) => void;
}

const useEditModalStore = create<EditModalStore>()((set) => ({
    open: false,
    id: "",
    toggle: () => set((state) => ({ open: !state.open })),
    setOpen: (open: boolean) => set({ open }),
    setId: (id: string) => set({ id })
}));

export default useEditModalStore;