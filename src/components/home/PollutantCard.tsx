import type { LucideIcon } from 'lucide-react';

interface PollutantCardProps {
    label: string;
    value: number;
    unit: string;
    icon: LucideIcon;
    colorClass: string;
    subtext?: string;
}

export default function PollutantCard({ label, value, unit, icon: Icon, colorClass, subtext }: PollutantCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 text-opacity-100`}>
                    <Icon size={24} className={colorClass.replace('bg-', 'text-').replace('/10', '')} />
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                    {unit}
                </span>
            </div>

            <div>
                <p className="text-gray-500 font-medium text-sm mb-1">{label}</p>
                <div className="flex items-baseline gap-1">
                    <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
                    <span className="text-sm text-gray-400 font-medium">{unit}</span>
                </div>
                {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
            </div>
        </div>
    );
}
