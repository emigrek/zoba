import { FC, createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';

interface PageContextProps {
    drawer: boolean,
    setDrawer: Dispatch<SetStateAction<boolean>>
}

export const PageContext = createContext<PageContextProps>({
    drawer: false,
    setDrawer: () => {}
});

interface PageContextProviderProps {
    children: ReactNode
}

const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
    const [drawer, setDrawer] = useState(false);

    return (
        <PageContext.Provider value={{ drawer, setDrawer }}>
            {children}
        </PageContext.Provider>
    )
}

export default PageContextProvider;