import Head from 'next/head'
import { FC, ReactNode } from 'react'

interface InterstitialLayoutProps {
    children: ReactNode
}

const InterstitialLayout: FC<InterstitialLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>zoba</title>
                <meta name="description" content="Shorten links and manage them in fashionable way" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex min-h-screen'>
                {children}
            </div>
        </>
    )
}

export default InterstitialLayout