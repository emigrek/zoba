import { FC, useState } from 'react'
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import QRCode from 'react-qr-code';
import { BiDownload, BiQr } from 'react-icons/bi';
import extractDomain from 'extract-domain';
import saveSVG from '@/utils/saveSvg';
import { toast } from 'react-hot-toast';

interface QRFormProps {
    initialUrl?: string;
}

const QRForm: FC<QRFormProps> = ({ initialUrl }) => {
    const [url, setUrl] = useState<string>(initialUrl || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!url)
            return toast.error('Please provide text.');

        saveSVG({
            id: 'qr-code',
            filename: `QR-${extractDomain(url)}`
        });
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 flex-grow">
            <div className='flex items-center justify-center'>
                <div className='w-48 md:w-64'>
                    {
                        url ?
                            <QRCode id="qr-code" className="w-full" value={url} bgColor="#171717" fgColor="#fff" />
                            :
                            <div className='bg-neutral-500/5 rounded-lg aspect-square p-3 relative flex-col flex justify-center items-center text-neutral-500'>
                                <BiQr className='w-40 h-40' />
                                <p>No link provided</p>
                            </div>
                    }
                </div>
            </div>
            <div className='flex flex-col justify-center gap-5 grow'>
                <div className="flex flex-col gap-2">
                    <p className="text-neutral-400">Link</p>
                    <Input value={url} onChange={handleUrlChange} id="url" placeholder="Paste your link" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Button variant="accent" className='w-full' size="large" iconRight={BiDownload}>Download</Button>
                </div>
            </div>
        </form>
    )
}

export default QRForm