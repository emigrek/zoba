import { FC, ReactNode } from 'react'

interface LinkGridProps {
    children: ReactNode
}

const LinkGrid: FC<LinkGridProps> = ({
    children
}) => {
  return (
    <div className='grid'>
        {children}
    </div>
  )
}

export default LinkGrid