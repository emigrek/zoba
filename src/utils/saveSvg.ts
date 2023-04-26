interface SaveSVGProps {
    id: string;
    filename: string;
}

const saveSVG = ({ id, filename }: SaveSVGProps) => {
    const svg = document.getElementById(id) as HTMLElement;
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
        a.download = `${filename}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
    };
}

export default saveSVG;