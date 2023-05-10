import Link from 'next/link';
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

interface BreadcrumbProps {
    separator?: ReactNode;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ separator = '/' }) => {
    const router = useRouter();
    const { route } = router;
    const items = route.split('/').filter(item => item !== '');

    return (
        <div className='text-lg flex items-center'>
            {
                items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isFirst = index === 0;
                    const capitalized = item.charAt(0).toUpperCase() + item.slice(1);

                    return (
                        <div key={index} className='flex items-center'>
                            <div className='text-neutral-300'>{
                                isLast ?
                                    <span className={`${isFirst ? 'font-semibold' : ''}`}>{capitalized}</span>
                                    :
                                    <Link className={`${isFirst ? 'font-semibold' : ''}`} href={`/${item}`}>{capitalized}</Link>
                            }</div>
                            {!isLast && (
                                <div className='text-neutral-300 mx-2'>
                                    {separator}
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Breadcrumb