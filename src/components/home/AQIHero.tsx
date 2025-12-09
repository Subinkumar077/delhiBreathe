import type { SensorReading } from '../../types/sensor';
import { getAqiGradient, getHealthMessage } from '../../utils/aqiColors';
import { formatTimestamp } from '../../utils/formatters';
import { Activity } from 'lucide-react';

interface AQIHeroProps {
    data: SensorReading;
}

export default function AQIHero({ data }: AQIHeroProps) {
    return (
        <div
            className="relative overflow-hidden rounded-3xl p-6 text-white shadow-sm transition-colors hover:shadow-lg flex flex-col justify-between"
            style={{ 
                background: getAqiGradient(data.aqi),
                height: '350px'
            }}
        >
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                <Activity size={180} className="hidden sm:block" />
                <Activity size={120} className="block sm:hidden" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between" style={{ height: '100%' }}>
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex-1">
                        <h2 className="text-base sm:text-lg font-medium opacity-90">Current Air Quality</h2>
                        <p className="text-xs opacity-75 mt-0.5">
                            Last updated: {formatTimestamp(data.timestamp)}
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/20 whitespace-nowrap">
                        {data.aqiCategory}
                    </div>
                </div>

                {/* AQI Value */}
                <div className="flex items-center justify-start my-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl sm:text-8xl font-bold tracking-tighter leading-none">
                            {data.aqi}
                        </span>
                        <span className="text-2xl sm:text-3xl font-medium opacity-80">AQI</span>
                    </div>
                </div>

                {/* Health Advisory */}
                <div className="bg-black/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <p className="text-xs sm:text-sm leading-relaxed font-medium">
                        <span className="font-semibold">Health Advisory:</span> {getHealthMessage(data.aqiCategory)}
                    </p>
                </div>
            </div>
        </div>
    );
}
