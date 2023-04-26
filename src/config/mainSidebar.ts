import { BiCut, BiQr } from "react-icons/bi";
import { IconType } from "react-icons/lib";

export interface SidebarItem {
    name: string;
    icon: IconType;
    href: string;
}

export interface SidebarConfig {
    items: SidebarItem[];
}

export const mainSidebarConfig: SidebarConfig = {
    items: [
        {
            name: "Shorten",
            icon: BiCut,
            href: "/shorten"
        },
        {
            name: "QR Code",
            icon: BiQr,
            href: "/qr"
        }
    ]
}