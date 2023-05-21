import cn from '@/utils/cn'
import Link from 'next/link';
import { AnchorHTMLAttributes, FC } from 'react'

interface NextAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

const NextAnchor: FC<NextAnchorProps> = ({ className, children, ...props }) => {
    return (
        <Link className={cn("cursor-pointer text-accent-200 hover:text-accent-300 transition duration-100 hover:underline hover:underline-offset-2", className)} {...props}>
            {children}
        </Link>
    )
}

NextAnchor.displayName = "NextAnchor";

export default NextAnchor;