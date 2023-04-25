import { FC, ReactNode, cloneElement, ReactElement } from 'react'

interface ComposeProps {
    contexts: ReactElement[],
    children: ReactNode
}

const Compose: FC<ComposeProps> = ({ contexts, children }) => {
    return (
        <>
            {
                contexts.reduceRight((child, parent) => {
                    return cloneElement(parent, {}, child);
                }, children)
            }
        </>
    )
}

export default Compose