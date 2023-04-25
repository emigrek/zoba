import { FC, ReactNode } from 'react'

interface InterstitialLayoutProps {
    children: ReactNode
}

const InterstitialLayout: FC<InterstitialLayoutProps> = ({ children }) => {
    return (
        <div className='flex min-h-screen'>
            {children}
        </div>
    )
}

export default InterstitialLayout