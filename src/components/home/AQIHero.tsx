import type { SensorReading } from '../../types/sensor';
import { getAqiGradient, getHealthMessage } from '../../utils/aqiColors';
import { formatTimestamp } from '../../utils/formatters';
import { Activity } from 'lucide-react';

interface AQIHeroProps {
    data: SensorReading;
}

export default function AQIHero({ data }: AQIHeroProps) {
    return (
        <section
            className="relative overflow-hidden rounded-3xl p-6 text-white shadow-sm flex flex-col justify-between"
            style={{ 
                background: getAqiGradient(data.aqi),
                height: '320px'
            }}
            role="region"
            aria-label="Current Air Quality Index"
        >
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                <Activity size={180} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-medium">Current Air Quality Index</h2>
                        <p className="text-xs opacity-75 mt-1" role="status" aria-live="polite">
                            Last updated: {formatTimestamp(data.timestamp)}
                        </p>
                    </div>
                    <div 
                        className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold"
                        role="status"
                        aria-label={`Air quality category: ${data.aqiCategory}`}
                    >
                        {data.aqiCategory}
                    </div>
                </div>

                {/* AQI Value */}
                <div className="flex items-baseline gap-2 my-4" role="status" aria-live="polite">
                    <span className="text-8xl font-bold leading-none" aria-label={`Air Quality Index ${data.aqi}`}>
                        {data.aqi}
                    </span>
                    <span className="text-4xl font-medium" aria-hidden="true">AQI</span>
                </div>

                {/* Health Advisory */}
                <div className="bg-black/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Health Advisory:</span> {getHealthMessage(data.aqiCategory)}
                    </p>
                </div>
            </div>
        </section>
    );
}
