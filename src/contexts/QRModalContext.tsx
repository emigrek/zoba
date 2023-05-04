import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface QRModalContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
}

export const QRModalContext = createContext<QRModalContextProps>({
    isOpen: false,
    setIsOpen: () => { },
    text: '',
    setText: () => { },
});

interface QRModalContextProviderProps {
    children?: ReactNode;
}

const QRModalContextProvider: FC<QRModalContextProviderProps> = (
    { children }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    return (
        <QRModalContext.Provider value={{ isOpen, setIsOpen, text, setText }}>
            {children}
        </QRModalContext.Provider>
    )
};

export default QRModalContextProvider;