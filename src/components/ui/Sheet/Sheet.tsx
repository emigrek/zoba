import { cva } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

const sheetVariants = cva(
    "w-fit rounded-xl",
    {
        variants: {
            variant: {
                light: "bg-neutral-300/5 text-neutral-200",
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

interface SheetProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {
}

const Sheet = forwardRef<HTMLDivElement, SheetProps>(({ className, size, variant, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(sheetVariants({ className, size, variant }))}
            {...props}
        />
    )
})

export { Sheet, sheetVariants };