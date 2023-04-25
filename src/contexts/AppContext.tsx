import { FC, ReactNode } from "react";

import ShortenModalContextProvider from "@/contexts/ShortenModalContext";
import QRModalContextProvider from "@/contexts/QRModalContext";
import SearchModalContextProvider from "@/contexts/SearchModalContext";

import Compose from "@/utils/Compose";

interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    return (
        <Compose
            contexts={[
                <QRModalContextProvider />,
                <ShortenModalContextProvider />,
                <SearchModalContextProvider/>
            ]}
        >
            {children}
        </Compose>
    );
}