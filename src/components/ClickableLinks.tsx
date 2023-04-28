import { api } from '@/utils/api'
import { FC } from 'react'
import LinkGrid from './LinkGrid';
import LinkItem from './LinkItem';

interface ClickableLinksProps { }

const ClickableLinks: FC<ClickableLinksProps> = ({ }) => {
    const { data: links } = api.link.getMostVisited.useQuery();

    return (
        <LinkGrid>
            {
                links?.map((link, index) => {
                    return <LinkItem key={index} link={link} />
                })
            }
        </LinkGrid>
    )
}

export default ClickableLinks