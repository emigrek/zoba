import cn from '@/utils/cn'
import { FC, HTMLAttributes } from 'react'

interface DropdownDividerProps extends HTMLAttributes<HTMLHRElement> {}

const DropdownDivider: FC<DropdownDividerProps> = ({ className, ...props }) => {
  return <hr className={cn("opacity-10", className)} {...props}/>
}

export default DropdownDivider