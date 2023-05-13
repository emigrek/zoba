import { FC, forwardRef, InputHTMLAttributes } from 'react'
import cn from '@/utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            className={cn("flex h-12 w-full rounded-full transition duration-200 ease-in-out bg-neutral-600/20 px-4 text-sm focus-within:ring-2 focus-within:ring-neutral-600 outline-none placeholder:text-neutral-500", className)}
            ref={ref}
            {...props}
        />
    )
})

Input.displayName = "Input";

export { Input };