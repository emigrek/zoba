import { FC, useEffect, useState } from 'react'
import cn from '@/utils/cn';
import { HexColorPicker } from 'react-colorful';
import { CgColorPicker } from 'react-icons/cg';

import { Input } from '@/components/ui/Input/Input';
import Dropdown from '@/components/ui/Dropdown/Dropdown';

interface ColorInputProps {
    className?: string;
    color?: string;
    placeholder?: string;
    onChange?: (color: string) => void;
}

const ColorInput: FC<ColorInputProps> = ({ className, color: initial, placeholder, onChange }) => {
    const [color, setColor] = useState<string>(initial || '#000000');

    useEffect(() => {
        onChange && onChange(color);
    }, [color, onChange]);
    
    return (
        <div className={cn("flex items-center group", className)}>
            <Input className='rounded-r-none' value={color} onChange={(e) => setColor(e.target.value)} placeholder={placeholder} />
            <Dropdown>
                <Dropdown.Trigger>
                    <div className='w-10 h-12 rounded-r-full flex items-center justify-center transition duration-200 ease-in-out group-focus-within:ring-2 group-focus-within:ring-neutral-600' style={{ backgroundColor: color }}>
                        <CgColorPicker className='w-5 h-5 text-neutral-400 mix-blend-difference' />
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Content className='top-0 right-0 items-center'>
                    <HexColorPicker color={color} onChange={(color) => setColor(color)} />
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
};

ColorInput.displayName = "ColorInput";

export default ColorInput;