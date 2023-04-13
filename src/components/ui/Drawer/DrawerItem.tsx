import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority';
import { FC, ReactNode, HTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { iconVariants } from '../Button/Button';

const drawerItemVariants = cva(
    "w-full rounded-lg flex gap-6 cursor-pointer items-center font-semibold transition duration-100 text-white tracking-wide",
    {
        variants: {
            variant: {
                default: "bg-gray-500 hover:bg-gray-600  focus:ring-2 focus:ring-gray-500/50",
                blue: "bg-blue-500/20 hover:bg-blue-600/60 focus:ring-2 focus:ring-blue-500/50",
                emerald: "bg-emerald-500/20 hover:bg-emerald-600/60 focus:ring-2 focus:ring-emerald-500/50",
                red: "bg-red-500/20 hover:bg-red-600/60 focus:ring-2 focus:ring-red-500/50",
                yellow: "bg-yellow-500/20 hover:bg-yellow-600/60 focus:ring-2 focus:ring-yellow-500/50",
                cyan: "bg-cyan-500/20 hover:bg-cyan-600/60 focus:ring-2 focus:ring-cyan-500/50",
                transparent: "bg-white/5 hover:bg-gray-500/20 focus:ring-2 focus:ring-gray-500/50",
            },
            size: {
                small: "px-4 py-2 text-sm gap-1",
                medium: "px-5 py-3 text-base gap-2",
                large: "px-6 py-4 text-lg gap-2"
            }
        },
        defaultVariants: {
            variant: "transparent",
            size: "medium"
        }
    }
);

interface DrawerItemProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerItemVariants> {
    children: ReactNode
    iconLeft?: IconType,
    iconRight?: IconType
}

const DrawerItem: FC<DrawerItemProps> = ({ className, size, variant, children, iconLeft: IconL, iconRight: IconR, ...props }) => {
    return (
        <div className={cn(drawerItemVariants({ className, size, variant }))} {...props}>
            {IconL ? <IconL className={cn(iconVariants({ size, variant }))} /> : null}
            <span>{children}</span>
            {IconR ? <IconR className={cn(iconVariants({ size, variant }))} /> : null}
        </div>
    )
}

export { DrawerItem, drawerItemVariants }