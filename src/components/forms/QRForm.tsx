import { FC, useState } from 'react'
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import QRCode from 'react-qr-code';
import { BiDownload, BiQr } from 'react-icons/bi';
import extractDomain from 'extract-domain';

interface QRFormProps {
    initialUrl?: string;
}

const QRForm: FC<QRFormProps> = ({ initialUrl }) => {
    const [url, setUrl] = useState<string>(initialUrl || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!url) return;

        saveQrSvg();
    };

    const saveQrSvg = () => {
        const svg = document.getElementById('qr-code') as HTMLElement;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const a = document.createElement('a');
            a.download = `QR-${extractDomain(url)}.png`;
            a.href = canvas.toDataURL('image/png');
            a.click();
        };
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-grow my-2">
            <div className='flex items-center justify-center'>
                {
                    url ?
                        <QRCode id="qr-code" value={url} size={300} bgColor="#171717" fgColor="#fff" />
                        :
                        <div className='w-[300px] bg-neutral-500/5 rounded-lg aspect-square relative flex-col flex justify-center items-center text-neutral-500'>
                            <BiQr className='w-40 h-40' />
                            <p>No link provided</p>
                        </div>
                }
            </div>
            <div className='flex flex-col justify-center gap-5'>
                <div className="flex flex-col gap-2">
                    <p className="text-neutral-400">Link</p>
                    <Input value={url} onChange={handleUrlChange} id="url" placeholder="Paste your link" />
                </div>
                <Button variant="accent" className='w-full' size="large" iconRight={BiDownload}>Save to your device</Button>
            </div>
        </form>
    )
}

export default QRForm