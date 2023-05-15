import cn from '@/utils/cn'
import { FC, HTMLAttributes } from 'react'

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
    label: string
}

const ModalHeader: FC<ModalHeaderProps> = ({ className, label, ...props }) => {
    return (
        <div className={cn('pb-3 border-b border-neutral-700', className)} {...props}>
            <h1 className="text-2xl font-semibold">{label}</h1>
        </div>
    )
}

export default ModalHeader