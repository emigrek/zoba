import cn from '@/utils/cn'
import { AnchorHTMLAttributes, FC } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Anchor: FC<AnchorProps> = ({ className, children, ...props }) => {
    return (
        <a className={cn("cursor-pointer text-accent-200 hover:text-accent-300 transition duration-100 hover:underline hover:underline-offset-2", className)} {...props}>
            {children}
        </a>
    )
}

Anchor.displayName = "Anchor";

export default Anchor;