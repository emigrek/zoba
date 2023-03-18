import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';

const containerVariants = cva(
    "container m-auto px-4",
    {
        variants: {
            size: {
                small: "max-w-2xl",
                medium: "max-w-6xl",
                large: "max-w-8xl"
            }
        },
        defaultVariants: {
            size: "medium"
        }
    }
);

interface ContainerProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
}

const Container: FC<ContainerProps> = forwardRef<HTMLDivElement, ContainerProps>(({ className, size, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(containerVariants({ className, size }))}
            {...props}
        />
    )
})

export { Container, containerVariants };