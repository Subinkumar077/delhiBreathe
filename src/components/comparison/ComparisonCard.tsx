import { X, TrendingUp, TrendingDown } from 'lucide-react';
import type { CityData } from '../../types/city';
import { getAqiColor } from '../../utils/aqiColors';

interface ComparisonCardProps {
    data: CityData;
    onRemove: (city: string) => void;
    colorIndex: number;
}

const COLORS = ['#667eea', '#F44336', '#4CAF50', '#FFC107', '#9C27B0'];

export default function ComparisonCard({ data, onRemove, colorIndex }: ComparisonCardProps) {
    const isImproving = data.currentAqi < data.history[0].aqi; // Simple trend logic

    return (
        <div className="relative bg-white rounded-2xl p-5 shadow-sm border-l-4 overflow-hidden"
            style={{ borderLeftColor: COLORS[colorIndex % COLORS.length] }}>
            <button
                onClick={() => onRemove(data.name)}
                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
                <X size={16} />
            </button>

            <div className="mb-3">
                <h4 className="font-bold text-gray-900 text-lg">{data.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium text-white"
                        style={{ backgroundColor: getAqiColor(data.currentAqi) }}>
                        {data.aqiCategory}
                    </span>
                    <span className={`flex items-center text-xs font-medium ${isImproving ? 'text-green-500' : 'text-red-500'}`}>
                        {isImproving ? <TrendingDown size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1" />}
                        {isImproving ? 'Improving' : 'Worsening'}
                    </span>
                </div>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{data.currentAqi}</span>
                <span className="text-sm text-gray-400">AQI</span>
            </div>
        </div>
    );
}
