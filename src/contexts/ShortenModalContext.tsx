import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface ShortenModalContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ShortenModalContext = createContext<ShortenModalContextProps>({
    isOpen: false,
    setIsOpen: () => { },
});

interface ShortenModalContextProviderProps {
    children?: ReactNode;
}

const ShortenModalContextProvider: FC<ShortenModalContextProviderProps> = (
    { children }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <ShortenModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ShortenModalContext.Provider>
    )
};

export default ShortenModalContextProvider;