import cn from '@/utils/cn'
import { FC, HTMLAttributes } from 'react'

type DropdownDividerProps = HTMLAttributes<HTMLHRElement>

const DropdownDivider: FC<DropdownDividerProps> = ({ className, ...props }) => {
  return <hr className={cn("opacity-10 mx-2", className)} {...props}/>
}

export default DropdownDivider