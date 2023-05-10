import { FC, forwardRef, InputHTMLAttributes } from 'react'
import cn from '@/utils/cn';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    right?: React.ReactNode
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({ right, className, ...props }, ref) => {
    return (
        <div className={cn(
            "flex h-12 w-full rounded-full transition duration-200 ease-in-out bg-neutral-600/20 px-4 text-sm focus-within:ring-2 focus-within:ring-neutral-600",
            className
        )}>
            <input
                className={cn("bg-transparent outline-none w-full placeholder:text-neutral-500 h-full")}
                ref={ref}
                {...props}
            />
            { right ? <div className='flex items-center justify-center'>{right}</div> : null }
        </div>
    )
})

Input.displayName = "Input";

export { Input };