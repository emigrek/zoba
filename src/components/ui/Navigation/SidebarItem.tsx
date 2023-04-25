import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority';
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { iconVariants } from '@/components/ui/Button/Button';

const sidebarItemVariants = cva(
    "w-full rounded-lg flex cursor-pointer items-center justify-center md:justify-start transition duration-200 text-neutral-400",
    {
        variants: {
            variant: {
                default: "bg-gray-500 hover:bg-gray-600  focus:ring-1 focus:ring-gray-100/70",
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

interface SidebarItemProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants> {
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const SidebarItem: FC<SidebarItemProps> = ({ className, size, variant, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <div className={cn(sidebarItemVariants({ className, size, variant }))} {...props}>
            {IconL ? <IconL className={cn(iconVariants({ size, variant }))} /> : null}
            <span className='hidden md:block'>{children}</span>
            {IconR ? <IconR className={cn(iconVariants({ size, variant }))} /> : null}
        </div>
    )
}

export { SidebarItem, sidebarItemVariants }