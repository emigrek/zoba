import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction, useCallback } from 'react';

interface DropdownContextProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
    targetRef: (node: HTMLElement | null) => void;
    dropdownRef: (node: HTMLElement | null) => void;
    targetNode: HTMLElement | null;
    dropdownNode: HTMLElement | null;
}

export const DropdownContext = createContext<DropdownContextProps>({
    open: false,
    setOpen: () => {
        //do nothing 
    },
    toggle: () => {
        //do nothing
    },
    targetRef: () => {
        //do nothing
    },
    dropdownRef: () => {
        //do nothing
    },
    targetNode: null,
    dropdownNode: null
});

interface DropdownContextProviderProps {
    children?: ReactNode;
}

const DropdownContextProvider: FC<DropdownContextProviderProps> = (
    { children }
) => {
    const [open, setOpen] = useState<boolean>(false);
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
    const [dropdownNode, setDropdownNode] = useState<HTMLElement | null>(null);

    const dropdownRef = useCallback((node: HTMLElement | null) => {
        setDropdownNode(node);
    }, []);

    const targetRef = useCallback((node: HTMLElement | null) => {
        setTargetNode(node);
    }, []);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <DropdownContext.Provider value={{ open, setOpen, toggle, dropdownRef, targetRef, targetNode, dropdownNode }}>
            {children}
        </DropdownContext.Provider>
    )
};

export default DropdownContextProvider;