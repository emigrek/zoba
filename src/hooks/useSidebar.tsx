import { SidebarContext } from "@/contexts/SidebarContext"
import { useContext } from "react"

const useSidebar = () => {
    const context = useContext(SidebarContext);
    return context;
}

export default useSidebar;