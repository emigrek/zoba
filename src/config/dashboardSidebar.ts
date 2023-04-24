import { BiCog, BiLink } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { SidebarConfig } from "./mainSidebar";

export const dashboardSidebarConfig: SidebarConfig = {
    items: [
        {
            name: "Dashboard",
            icon: MdDashboard,
            href: "/dashboard"
        },
        {
            name: "Links",
            icon: BiLink,
            href: "/dashboard/links"
        },
        {
            name: "Analytics",
            icon: IoAnalytics,
            href: "/dashboard/analytics"
        },
        {
            name: "Settings",
            icon: BiCog,
            href: "/dashboard/settings"
        }
    ]
}