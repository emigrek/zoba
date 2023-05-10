import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';
import { useWindowScroll } from '@mantine/hooks';

const navbarVariants = cva(
    "w-full sticky top-0 left-0 right-0 h-16 z-10 shadow-xl",
    {
        variants: {
            variant: {
                light: "bg-neutral-100/80 backdrop-blur-sm text-neutral-900",
                dark: "bg-accent-950/80 backdrop-blur-sm text-neutral-200",
                transparent: "bg-transparent text-neutral-200"
            }
        },
        defaultVariants: {
            variant: "transparent"
        }
    }
);

const borderVariants = cva(
    "border-b",
    {
        variants: {
            variant: {
                light: "border-neutral-600",
                dark: "border-neutral-800",
                transparent: "border-neutral-700"
            }
        },
        defaultVariants: {
            variant: "transparent"
        }
    }
)

interface NavbarProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {}

const Navbar: FC<NavbarProps> = forwardRef<HTMLDivElement, NavbarProps>(({ className, variant, children, ...props }, ref) => {
    const [{y}] = useWindowScroll();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => { y>20 ? setIsScrolled(true) : setIsScrolled(false); }, [y]);

    return (
        <nav
            ref={ref}
            className={cn(
                navbarVariants({ className, variant }),
                isScrolled ? borderVariants({ variant }) : null
            )}
            {...props}
        >
            {children}
        </nav>
    )
})

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants };