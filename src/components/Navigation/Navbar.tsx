import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';
import { Container, containerVariants } from '../Container/Container';

const navbarVariants = cva(
    "w-full backdrop-blur-sm fixed top-0 z-40",
    {
        variants: {
            variant: {
                light: "bg-white/5 text-neutral-200",
                dark: "bg-black/5 text-neutral-200",
                transparent: "bg-transparent text-neutral-200"
            },
            size: {
                small: "h-10 py-2",
                medium: "h-16 py-3",
                large: "h-20 py-4"
            }
        },
        defaultVariants: {
            variant: "transparent",
            size: "medium"
        }
    }
);

interface NavbarProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {
}

const Navbar: FC<NavbarProps> = forwardRef<HTMLDivElement, NavbarProps>(({ className, size, variant, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(navbarVariants({ className, size, variant }))}
            {...props}
        >
            <Container className={cn(containerVariants({ size }))}>
                <div className="flex justify-between items-center">
                    {children}
                </div>
            </Container>
        </div>
    )
})

export { Navbar, navbarVariants };