import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

const navbarVariants = cva(
    "w-full sticky top-0 left-0 right-0 h-16 z-10 shadow shadow-lg",
    {
        variants: {
            variant: {
                light: "bg-neutral-300/80 text-neutral-200",
                dark: "bg-night text-neutral-200",
                transparent: "bg-transparent text-neutral-200"
            }
        },
        defaultVariants: {
            variant: "transparent"
        }
    }
);

interface NavbarProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {
}

const Navbar: FC<NavbarProps> = forwardRef<HTMLDivElement, NavbarProps>(({ className, variant, children, ...props }, ref) => {
    return (
        <nav
            ref={ref}
            className={cn(navbarVariants({ className, variant }))}
            {...props}
        >
            {children}
        </nav>
    )
})

export { Navbar, navbarVariants };