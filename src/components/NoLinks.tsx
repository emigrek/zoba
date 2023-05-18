import { FC } from 'react'
import { MdOutlet } from 'react-icons/md'
import { Button } from './ui/Button/Button'
import useShortenModalStore from '@/stores/shortenModal'
import { BiCut } from 'react-icons/bi'

const NoLinks: FC = () => {
    const { toggle } = useShortenModalStore();

    return (
        <div className="flex flex-col gap-3 items-center justify-center text-neutral-500 py-10">
            <MdOutlet className="w-20 h-20" />
            <p>You don&apos;t have any links yet.</p>
            <Button variant={"transparent"} iconRight={BiCut} onClick={toggle}>Shorten</Button>
        </div>
    )
}

export default NoLinks