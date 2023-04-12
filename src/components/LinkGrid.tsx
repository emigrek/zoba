import { FC, ReactNode } from 'react'

interface LinkGridProps {
    children: ReactNode
}

const LinkGrid: FC<LinkGridProps> = ({
    children
}) => {
  return (
    <div className='grid gap-2'>
      {children}
    </div>
  )
}

export default LinkGrid