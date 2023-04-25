import { FC } from 'react'

interface ModalHeaderProps {
    label: string
}

const ModalHeader: FC<ModalHeaderProps> = ({ label }) => {
    return (
        <div className='pb-4 border-b border-neutral-700'>
            <h1 className="text-2xl font-semibold">{label}</h1>
        </div>
    )
}

export default ModalHeader