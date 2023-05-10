import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface DropdownContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DropdownContext = createContext<DropdownContextProps>({
    isOpen: false,
    setIsOpen: () => { 
        //do nothing 
    },
});

interface DropdownContextProviderProps {
    children?: ReactNode;
}

const DropdownContextProvider: FC<DropdownContextProviderProps> = (
    { children }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </DropdownContext.Provider>
    )
};

export default DropdownContextProvider;