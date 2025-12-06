import RankBadge from './RankBadge';
import { getAqiColor } from '../../utils/aqiColors';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RankingTableProps {
    data: any[];
}

export default function RankingTable({ data }: RankingTableProps) {
    return (
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4 w-16">Rank</th>
                        <th className="p-4">City</th>
                        <th className="p-4">AQI</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.map((city, index) => (
                        <tr key={city.name} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                                <RankBadge rank={index + 1} />
                            </td>
                            <td className="p-4 font-medium text-gray-900">{city.name}</td>
                            <td className="p-4">
                                <span
                                    className="px-2 py-1 rounded-md text-white font-bold shadow-sm"
                                    style={{ backgroundColor: getAqiColor(city.aqi) }}
                                >
                                    {city.aqi}
                                </span>
                            </td>
                            <td className="p-4 text-gray-600">{city.category}</td>
                            <td className="p-4">
                                {city.trend === 'up' && <span className="flex items-center text-red-500 text-sm"><TrendingUp size={16} className="mr-1" /> Worsening</span>}
                                {city.trend === 'down' && <span className="flex items-center text-green-500 text-sm"><TrendingDown size={16} className="mr-1" /> Improving</span>}
                                {city.trend === 'stable' && <span className="flex items-center text-gray-400 text-sm"><Minus size={16} className="mr-1" /> Stable</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
