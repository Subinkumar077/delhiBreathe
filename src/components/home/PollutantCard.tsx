import type { LucideIcon } from 'lucide-react';
import { getPollutantStatus, POLLUTANT_INFO } from '../../constants/airQualityStandards';
import { Info } from 'lucide-react';

interface PollutantCardProps {
    label: string;
    value: number;
    unit: string;
    icon: LucideIcon;
    colorClass?: string; // Optional now, kept for backward compatibility
    subtext?: string;
    onClick?: () => void;
}

export default function PollutantCard({ label, value, unit, icon: Icon, onClick }: PollutantCardProps) {
    // Map label to pollutant type for standards lookup
    const getPollutantType = (label: string): string => {
        const mapping: { [key: string]: string } = {
            'PM2.5': 'PM2_5',
            'PM10': 'PM10',
            'CO': 'CO',
            'NO2': 'NO2',
            'SO2': 'SO2',
            'NH3': 'NO2', // Using NO2 standards as fallback for NH3
            'VOCs': 'VOCs'
        };
        return mapping[label] || label;
    };

    const pollutantType = getPollutantType(label);
    const status = getPollutantStatus(pollutantType, value);
    const info = POLLUTANT_INFO[pollutantType];

    return (
        <div 
            className="bg-white rounded-2xl p-5 shadow-sm border-2 hover:shadow-lg transition-all hover:-translate-y-1 h-full flex flex-col justify-between cursor-pointer group relative"
            style={{ borderColor: status.color }}
            title={info?.source || ''}
            onClick={onClick}
        >
            {/* Click indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex justify-between items-start mb-4">
                <div 
                    className="p-3 rounded-xl bg-opacity-10"
                    style={{ backgroundColor: `${status.color}20` }}
                >
                    <Icon size={24} style={{ color: status.color }} />
                </div>
                <span 
                    className="text-xs font-semibold text-white px-2 py-1 rounded-md"
                    style={{ backgroundColor: status.color }}
                >
                    {status.status}
                </span>
            </div>

            <div>
                <p className="text-gray-500 font-medium text-sm mb-1">{label}</p>
                <div className="flex items-baseline gap-1">
                    <h4 className="text-2xl font-bold text-gray-900">{value.toFixed(2)}</h4>
                    <span className="text-sm text-gray-400 font-medium">{unit}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {status.message}
                </p>
                <p className="text-xs text-primary mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for details →
                </p>
            </div>
        </div>
    );
}
