import { create } from "zustand";

interface SidebarStore {
    open: boolean;
    toggle: () => void;
}

const useSidebarStore = create<SidebarStore>()((set) => ({
    open: false,
    toggle: () => set((state) => ({ open: !state.open })),
}))

export default useSidebarStore;