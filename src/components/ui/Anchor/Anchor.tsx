import cn from '@/utils/cn'
import { AnchorHTMLAttributes, FC, HTMLAttributes } from 'react'

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Anchor: FC<AnchorProps> = ({ className, children, ...props }) => {
    return (
        <a className={cn("cursor-pointer text-accent-200 hover:text-accent-300 transition duration-200", className)} {...props}>
            {children}
        </a>
    )
}

export default Anchor