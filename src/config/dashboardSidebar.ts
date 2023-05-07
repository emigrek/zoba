import { BiLink } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
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
        }
    ]
}