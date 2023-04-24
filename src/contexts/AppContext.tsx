import { FC, ReactNode } from "react";
import ShortenModalContextProvider from "./ShortenModalContext";
import QRModalContextProvider from "./QRModalContext";

interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    return (
        <ShortenModalContextProvider>
            <QRModalContextProvider>
                { children }
            </QRModalContextProvider>
        </ShortenModalContextProvider>
    );
}