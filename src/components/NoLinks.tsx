import { FC } from 'react'
import { MdOutlet } from 'react-icons/md'

const NoLinks: FC = () => {
    return (
        <div className="flex flex-col gap-3 items-center justify-center text-neutral-500 py-10">
            <MdOutlet className="w-20 h-20" />
            <p>You don&apos;t have any links yet.</p>
        </div>
    )
}

export default NoLinks