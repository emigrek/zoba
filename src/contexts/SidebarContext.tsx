import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface SidebarContextProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
    collapsed: false,
    setCollapsed: () => { },
    toggle: () => { },
});

interface SidebarContextProviderProps {
    children?: ReactNode;
}

const SidebarContextProvider: FC<SidebarContextProviderProps> = (
    { children }
) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    }

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
};

export default SidebarContextProvider;