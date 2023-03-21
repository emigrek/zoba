import { FC, forwardRef, InputHTMLAttributes } from 'react'
import cn from '@/utils/cn';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    right?: React.ReactNode
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({ right, className, size, ...props }, ref) => {
    return (
        <div className={cn(
            "flex h-12 w-full rounded-full transition duration-200 ease-in-out border border-gray-600 bg-transparent py-3 px-4 text-sm focus-within:ring-2 focus-within:ring-gray-600",
            className
        )}>
            <input
                className={cn("bg-transparent outline-none w-full placeholder:text-neutral-500 h-full")}
                ref={ref}
                {...props}
            />
            {right ? right : null}
        </div>
    )
})

export { Input };