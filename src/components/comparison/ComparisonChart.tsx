import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CityData } from '../../types/city';

interface ComparisonChartProps {
    data: CityData[];
}

const COLORS = ['#667eea', '#F44336', '#4CAF50', '#FFC107', '#9C27B0'];

export default function ComparisonChart({ data }: ComparisonChartProps) {
    // Transform data for Recharts: array of objects with time and keys for each city
    const chartData = data[0]?.history.map((h, i) => {
        const point: any = { time: h.time };
        data.forEach(city => {
            point[city.name] = city.history[i].aqi;
        });
        return point;
    }) || [];

    return (
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 h-[400px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">24hr AQI Trends</h3>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        interval={3}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    {data.map((city, index) => (
                        <Line
                            key={city.name}
                            type="monotone"
                            dataKey={city.name}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
