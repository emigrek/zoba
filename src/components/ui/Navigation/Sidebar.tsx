import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

const sidebarVariants = cva(
    "backdrop-filter backdrop-blur-sm z-20 absolute fixed top-0 bottom-0 transition-all duration-200",
    {
        variants: {
            variant: {
                light: "bg-neutral-300/80 text-neutral-200",
                dark: "bg-neutral-300/5 text-neutral-200",
                transparent: "bg-transparent text-neutral-200"
            },
            state: {
                open: "w-20 md:w-64 px-2 md:px-5",
                closed: "w-0"
            }
        },
        defaultVariants: {
            variant: "transparent",
            state: "open"
        }
    }
);

interface SidebarProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
    collapsed?: boolean;
}

const Sidebar: FC<SidebarProps> = forwardRef<HTMLDivElement, SidebarProps>(({ className, collapsed, variant, children, ...props }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(sidebarVariants({ className, variant, state: collapsed ? "closed" : "open" }))}
            {...props}
        >
            {
                !collapsed && (
                    children
                )
            }
        </aside>
    )
})

Sidebar.displayName = "Sidebar";

export { Sidebar, sidebarVariants };