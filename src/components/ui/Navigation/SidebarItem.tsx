import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority';
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

const sidebarItemVariants = cva(
    "w-full rounded-lg flex cursor-pointer items-center justify-center md:justify-start transition duration-200 text-neutral-400",
    {
        variants: {
            variant: {
                default: "bg-gray-500 hover:bg-gray-600  focus:ring-1 focus:ring-gray-100/70",
                accent: "bg-accent-500 hover:bg-accent-600 focus:ring-1 focus:ring-accent-100/70",
                blue: "bg-blue-500/20 hover:bg-blue-600/60 focus:ring-1 focus:ring-blue-100/70",
                emerald: "bg-emerald-500/20 hover:bg-emerald-600/60 focus:ring-1 focus:ring-emerald-100/70",
                red: "bg-red-500/20 hover:bg-red-600/60 focus:ring-1 focus:ring-red-100/70",
                yellow: "bg-yellow-500/20 hover:bg-yellow-600/60 focus:ring-1 focus:ring-yellow-100/70",
                cyan: "bg-cyan-500/20 hover:bg-cyan-600/60 focus:ring-1 focus:ring-cyan-100/70",
                active: "text-neutral-100 bg-neutral-500/20 focus:ring-1 focus:ring-neutral-100/70",
                transparent: "hover:bg-neutral-500/20 focus:ring-1 focus:ring-neutral-100/70",
            },
            size: {
                small: "px-4 py-2 text-sm gap-3",
                medium: "px-5 py-3 text-base gap-4",
                large: "px-5 py-5 text-lg gap-4"
            }
        },
        defaultVariants: {
            variant: "transparent",
            size: "medium"
        }
    }
);

const sidebarItemIconVariants = cva(
    "w-5 h-5",
    {
        variants: {
            variant: {
                default: "fill-neutral-100",
                accent: "fill-accent-500",
                blue: "fill-blue-500",
                emerald: "fill-emerald-500",
                red: "fill-red-500",
                yellow: "fill-yellow-500",
                cyan: "fill-cyan-500",
                active: "fill-neutral-100",
                transparent: "fill-neutral-400"
            },
            size: {
                small: "w-4 h-4",
                medium: "w-5 h-5",
                large: "w-6 h-6"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "medium"
        }
    }
)


interface SidebarItemProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants> {
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const SidebarItem: FC<SidebarItemProps> = ({ className, size, variant, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <div className={cn(sidebarItemVariants({ className, size, variant }))} {...props}>
            {IconL ? <IconL className={cn(sidebarItemIconVariants({ size, variant }))} /> : null}
            <span className='hidden md:block'>{children}</span>
            {IconR ? <IconR className={cn(sidebarItemIconVariants({ size, variant }))} /> : null}
        </div>
    )
}

export { SidebarItem, sidebarItemVariants, sidebarItemIconVariants }