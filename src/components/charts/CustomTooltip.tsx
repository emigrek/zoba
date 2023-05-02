import format from "date-fns/format";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-neutral-800 p-3 rounded-lg flex flex-col">
                <div className="text-2xl font-semibold text-center">{ payload[0].value } visits</div>
                <div className="text-neutral-400">{ format(new Date(label), 'PPP') }</div>
            </div>
        );
    }

    return null;
}

export default CustomTooltip