import { cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';
import Image from 'next/image';

const avatarVariants = cva(
    "relative flex items-center justify-center rounded-full",
    {
        variants: {
            size: {
                small: "w-10 h-10",
                medium: "w-12 h-12",
                large: "w-16 h-16",
            }
        },
        defaultVariants: {
            size: "medium"
        }
    }
);

interface AvatarProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
    src: string;
}

const Avatar: FC<AvatarProps> = forwardRef<HTMLDivElement, AvatarProps>(({ src, className, size, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(avatarVariants({ className, size }))}
            {...props}
        >
            <Image
                src={src}
                alt={"Avatar"}
                fill
                className="rounded-full"
            />
        </div>
    )
})

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };