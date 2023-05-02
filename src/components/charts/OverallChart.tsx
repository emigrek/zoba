import { endOfMonth, startOfMonth } from 'date-fns';
import format from 'date-fns/format';
import { FC } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip';

const OverallChart: FC = () => {
    const data = [
        {
            date: new Date('2023-01-30T18:39:38.123+00:00').getTime(),
            visits: 1
        },
        {
            date: new Date('2023-02-16T23:06:37.252+00:00').getTime(),
            visits: 5
        },
        {
            date: new Date('2023-03-08T23:01:15.714+00:00').getTime(),
            visits: 2
        },
        {
            date: new Date('2023-04-04T08:23:48.809+00:00').getTime(),
            visits: 7
        },
        {
            date: new Date('2023-04-20T08:23:48.809+00:00').getTime(),
            visits: 10
        },
    ];

    const dateMin = startOfMonth(new Date(data.at(0)!.date)).getTime();
    const dateMax = endOfMonth(new Date(data.at(-1)!.date)).getTime();

    return (
        <ResponsiveContainer width='100%' minHeight={'70%'}>
            <LineChart margin={{ left: -30 }} data={data}>
                <Line dataKey="visits" stroke="#6b5cff"/>
                <CartesianGrid stroke="#cccccc20" />
                <XAxis type="number" domain={[dateMin, dateMax]} allowDataOverflow dataKey="date" tickFormatter={(tick) => format(new Date(tick), 'MMMM')} />
                <YAxis/>
                <Tooltip content={<CustomTooltip/>}/>
            </LineChart>
        </ResponsiveContainer>  
    )
}

export default OverallChart