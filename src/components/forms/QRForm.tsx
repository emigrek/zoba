import { FC, useState } from 'react'
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import QRCode from 'react-qr-code';
import { BiDownload, BiQr } from 'react-icons/bi';
import extractDomain from 'extract-domain';
import saveSVG from '@/utils/saveSvg';
import { toast } from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { HexColorPicker } from 'react-colorful';
import { CgColorPicker } from 'react-icons/cg';
import { BsQrCode } from 'react-icons/bs';

interface QRFormProps {
    initialText?: string;
}

const QRForm: FC<QRFormProps> = ({ initialText }) => {
    const [text, setText] = useState<string>(initialText || '');
    const [foregroundColor, setForegroundColor] = useState<string>('#ffffff');

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
                <div className='w-56 md:w-60 aspect-square bg-neutral-500/10 rounded-lg'>
                    {
                        text ?
                            <QRCode id="qr-code" className="w-full h-full p-4" value={text} bgColor="#000" fgColor={foregroundColor} />
                            :
                            <div className='flex-col flex justify-center items-center text-neutral-500 aspect-square gap-2'>
                                <BsQrCode className='w-48 h-48 md:w-52 md:h-52 bg-black' style={{ fill: foregroundColor }} />
                            </div>
                    }
                </div>
            </div>
            <div className='flex flex-col justify-center gap-5 flex-grow'>
                <div className="flex flex-col gap-2">
                    <p className="text-neutral-400">Text</p>
                    <Input value={text} onChange={handleTextChange} placeholder="Enter your text" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-neutral-400">Foreground color</p>
                    <div className="flex gap-2 items-center">
                        <Input value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} placeholder='#ffffff' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className='w-12 h-12 rounded-full flex items-center justify-center' style={{ backgroundColor: foregroundColor }}>
                                    <CgColorPicker className='w-5 h-5 text-neutral-400 mix-blend-difference' />
                                </div>
                            </Dropdown.Trigger>
                            <Dropdown.Content className='top-0 right-0 items-center'>
                                <HexColorPicker color={foregroundColor} onChange={setForegroundColor} />
                            </Dropdown.Content>
                        </Dropdown>
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