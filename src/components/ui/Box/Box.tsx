import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

const boxVariants = cva(
    "w-fit rounded-xl",
    {
        variants: {
            variant: {
                light: "bg-white/5 text-neutral-200",
                dark: "bg-black/5 text-neutral-200",
                outlined: "bg-transparent border border-neutral-600 text-neutral-200"
            },
            size: {
                small: "p-4",
                medium: "p-5",
                large: "p-6"
            }
        },
        defaultVariants: {
            variant: "light",
            size: "medium"
        }
    }
);

interface BoxProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
}

const Box: FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(({ className, size, variant, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(boxVariants({ className, size, variant }))}
            {...props}
        />
    )
})

export { Box, boxVariants };