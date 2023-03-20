import { FC, forwardRef, InputHTMLAttributes } from 'react'
import cn from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn("flex h-12 w-full rounded-full transition duration-200 ease-in-out border border-gray-600 bg-transparent py-3 px-4 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-neutral-500 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50", className)}
            {...props}
        />
    )
})

export { Input };