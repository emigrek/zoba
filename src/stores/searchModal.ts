import { create } from "zustand";

interface SearchModalStore {
    open: boolean;
    query: string;
    toggle: () => void;
    setOpen: (open: boolean) => void;
    setQuery: (query: string) => void;
}

const useSearchModalStore = create<SearchModalStore>()((set) => ({
    open: false,
    query: "",
    toggle: () => set((state) => ({ open: !state.open })),
    setOpen: (open: boolean) => set({ open }),
    setQuery: (query: string) => set({ query })
}));

export default useSearchModalStore;