import { cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

import { VscLoading } from "react-icons/vsc";
import { IconType } from 'react-icons/lib';

const buttonVariants = cva(
    "relative w-fit flex items-center justify-center rounded-full text-white font-semibold tracking-wide transition duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "bg-gray-500 hover:bg-gray-600  focus:ring-2 focus:ring-gray-500/50",
                primary: "bg-blue-500/20 hover:bg-blue-600/60 focus:ring-2 focus:ring-blue-500/50",
                success: "bg-emerald-500/20 hover:bg-emerald-600/60 focus:ring-2 focus:ring-emerald-500/50",
                danger: "bg-red-500/20 hover:bg-red-600/60 focus:ring-2 focus:ring-red-500/50",
                warning: "bg-yellow-500/20 hover:bg-yellow-600/60 focus:ring-2 focus:ring-yellow-500/50",
                info: "bg-cyan-500/20 hover:bg-cyan-600/60 focus:ring-2 focus:ring-cyan-500/50",
                ghost: "bg-transparent hover:bg-gray-500/20 focus:ring-2 focus:ring-gray-500/50",
            },
            size: {
                small: "px-4 py-2 text-sm gap-1",
                medium: "px-5 py-3 text-base gap-2",
                large: "px-6 py-4 text-lg gap-2"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "medium"
        }
    }
);

const iconVariants = cva(
    "w-5 h-5",
    {
        variants: {
            variant: {
                default: "fill-neutral-100",
                primary: "fill-blue-500",
                success: "fill-emerald-500",
                danger: "fill-red-500",
                warning: "fill-yellow-500",
                info: "fill-cyan-500",
                ghost: "fill-neutral-100"
            },
            size: {
                small: "w-4 h-4",
                medium: "w-6 h-6",
                large: "w-8 h-8"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "medium"
        }
    }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    iconLeft?: IconType,
    iconRight?: IconType
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({ children, iconLeft: IconL, iconRight: IconR, className, size, variant, loading, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ className, size, variant }))}
            disabled={loading}
            {...props}
        >
            {IconL ? <IconL className={cn(iconVariants({ size, variant }))} /> : null}
            {loading ? (
                <div className="absolute relative-0 bg-black/80 w-full h-full rounded-full inset-0 flex items-center justify-center">
                    <VscLoading className="animate-spin w-6 h-6" />
                </div>
            ) : null}
            {children}
            {IconR ? <IconR className={cn(iconVariants({ size, variant }))} /> : null}
        </button>
    )
})

export { Button, buttonVariants, iconVariants };