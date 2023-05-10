import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface SearchModalContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchModalContext = createContext<SearchModalContextProps>({
    isOpen: false,
    setIsOpen: () => {
        // do nothing
    },
    query: '',
    setQuery: () => {
        // do nothing
    },
});

interface SearchModalContextProviderProps {
    children?: ReactNode;
}

const SearchModalContextProvider: FC<SearchModalContextProviderProps> = (
    { children }
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');

    return (
        <SearchModalContext.Provider value={{ isOpen, setIsOpen, query, setQuery }}>
            {children}
        </SearchModalContext.Provider>
    )
};

export default SearchModalContextProvider;