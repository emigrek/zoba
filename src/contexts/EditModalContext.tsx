import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface EditModalContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
    setId: Dispatch<SetStateAction<string>>;
}

export const EditModalContext = createContext<EditModalContextProps>({
    isOpen: false,
    setIsOpen: () => { },
    id: '',
    setId: () => { },
});

interface EditModalContextProviderProps {
    children?: ReactNode;
}

const EditModalContextProvider: FC<EditModalContextProviderProps> = (
    { children }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');

    return (
        <EditModalContext.Provider value={{ isOpen, setIsOpen, id, setId }}>
            {children}
        </EditModalContext.Provider>
    )
};

export default EditModalContextProvider;