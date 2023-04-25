import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface QRModalContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    url: string;
    setUrl: Dispatch<SetStateAction<string>>;
}

export const QRModalContext = createContext<QRModalContextProps>({
    isOpen: false,
    setIsOpen: () => { },
    url: '',
    setUrl: () => { },
});

interface QRModalContextProviderProps {
    children?: ReactNode;
}

const QRModalContextProvider: FC<QRModalContextProviderProps> = (
    { children }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');

    return (
        <QRModalContext.Provider value={{ isOpen, setIsOpen, url, setUrl }}>
            {children}
        </QRModalContext.Provider>
    )
};

export default QRModalContextProvider;