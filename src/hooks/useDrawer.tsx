import { PageContext } from "@/contexts/PageContext"
import { useContext } from "react"

const useDrawer = () => {
    const { drawer, setDrawer } = useContext(PageContext);
    return { drawer, setDrawer };
}

export default useDrawer;