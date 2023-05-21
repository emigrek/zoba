import { FC, useState } from 'react'
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import ColorInput from '@/components/ui/ColorInput/ColorInput';
import QRCode from 'react-qr-code';
import { BiDownload } from 'react-icons/bi';
import extractDomain from 'extract-domain';
import saveSVG from '@/utils/saveSvg';
import { toast } from 'react-hot-toast';
import { BsQrCode } from 'react-icons/bs';

interface QRFormProps {
    initialText?: string;
}

const Placeholder = () => (
    <div className='flex-col flex justify-center items-center text-neutral-600 aspect-square gap-2'>
        <BsQrCode className='w-32 h-32' />
        <p className='text-lg'>QR Code</p>
    </div>
)

const QRForm: FC<QRFormProps> = ({ initialText }) => {
    const [text, setText] = useState<string>(initialText || '');
    const [foregroundColor, setForegroundColor] = useState<string>('#ffffff');
    const [backgroundColor, setBackgroundColor] = useState<string>('#000000');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text)
            return toast.error('Please provide text.', { icon: '📝' });

        saveSVG({
            id: 'qr-code',
            filename: `QR-${extractDomain(text)}`
        });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5">
            <div className='flex items-center justify-center'>
                <div className='w-56 md:w-72 aspect-square bg-neutral-500/10 rounded-lg'>
                    { 
                        text ? 
                            <QRCode id="qr-code" className="w-full h-full p-4" value={text} bgColor={backgroundColor} fgColor={foregroundColor} />
                        :
                            <Placeholder />
                    }
                </div>
            </div>
            <div className='flex flex-col justify-center gap-5 flex-grow'>
                <div className="flex flex-col gap-2">
                    <p className="text-neutral-400">Text</p>
                    <Input value={text} onChange={handleTextChange} placeholder="Enter your text" />
                </div>
                <div className='flex flex-col lg:flex-row gap-2'>
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-400">Foreground color</p>
                        <ColorInput color={foregroundColor} onChange={setForegroundColor} placeholder={foregroundColor} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-400">Background color</p>
                        <ColorInput color={backgroundColor} onChange={setBackgroundColor} placeholder={backgroundColor} />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Button variant="accent" className='w-full' size="large" iconRight={BiDownload}>Download</Button>
                </div>
            </div>
        </form>
    )
}

export default QRForm