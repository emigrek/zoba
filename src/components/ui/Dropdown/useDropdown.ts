import { useContext } from "react"
import { DropdownContext } from "./DropdownContext"

const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a DropdownProvider")
    }

    return context;
}

export default useDropdown