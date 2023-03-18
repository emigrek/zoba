import { cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

import { VscLoading } from "react-icons/vsc";

const buttonVariants = cva(
    "relative w-fit flex items-center justify-center rounded-full text-white font-bold tracking-wide transition duration-200 ease-in-out gap-2 focus:outline-none disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "bg-gray-500 hover:bg-gray-600  focus:ring-2 focus:ring-gray-500/50",
                primary: "bg-blue-500/10 hover:bg-blue-600/60 focus:ring-2 focus:ring-blue-500/50",
                success: "bg-emerald-500/10 hover:bg-emerald-600/60 focus:ring-2 focus:ring-emerald-500/50",
                danger: "bg-red-500/10 hover:bg-red-600/60 focus:ring-2 focus:ring-red-500/50",
                warning: "bg-yellow-500/10 hover:bg-yellow-600/60 focus:ring-2 focus:ring-yellow-500/50",
                info: "bg-cyan-500/10 hover:bg-cyan-600/60 focus:ring-2 focus:ring-cyan-500/50"
            },
            size: {
                small: "px-4 py-2 text-sm",
                medium: "px-5 py-3 text-base",
                large: "px-6 py-4 text-lg"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "medium"
        }
    }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, size, variant, loading, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ className, size, variant }))}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <div className="absolute relative-0 bg-black/80 w-full h-full rounded-full inset-0 flex items-center justify-center">
                    <VscLoading className="animate-spin w-6 h-6" />
                </div>
            ) : null}
            {children}
        </button>
    )
})

export { Button, buttonVariants };