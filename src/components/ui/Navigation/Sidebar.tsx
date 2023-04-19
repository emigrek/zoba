import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

const sidebarVariants = cva(
    "backdrop-filter backdrop-blur-sm z-20 fixed top-0 bottom-0",
    {
        variants: {
            variant: {
                light: "bg-neutral-300/80 text-neutral-200",
                dark: "bg-neutral-300/5 text-neutral-200",
                transparent: "bg-transparent text-neutral-200"
            }
        },
        defaultVariants: {
            variant: "transparent"
        }
    }
);

interface SidebarProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
}

const Sidebar: FC<SidebarProps> = forwardRef<HTMLDivElement, SidebarProps>(({ className, variant, children, ...props }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(sidebarVariants({ className, variant }))}
            {...props}
        >
            {children}
        </aside>
    )
})

export { Sidebar, sidebarVariants };