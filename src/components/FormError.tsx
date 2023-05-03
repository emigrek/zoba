import { FC, ReactNode } from 'react'
import { IoAlertCircle } from 'react-icons/io5'

interface FormErrorProps {
    children: ReactNode
}

const FormError: FC<FormErrorProps> = ({ children }) => {
    return (
        <div className="text-red-500 flex gap-2 items-center">
            <IoAlertCircle className='w-6 h-6'/>
            {children}
        </div>
    )
}

export default FormError