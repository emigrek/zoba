import { create } from "zustand";

interface AccountDeleteStore {
    open: boolean;
    toggle: () => void;
    setOpen: (open: boolean) => void;
}

const useAccountDeleteStore = create<AccountDeleteStore>()((set) => ({
    open: false,
    toggle: () => set((state) => ({ open: !state.open })),
    setOpen: (open: boolean) => set({ open })
}));

export default useAccountDeleteStore;