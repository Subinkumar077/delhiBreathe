import type { SensorReading } from '../../types/sensor';
import { getAqiColor, getAqiGradient, getHealthMessage } from '../../utils/aqiColors';
import { formatTimestamp } from '../../utils/formatters';
import { Activity } from 'lucide-react';

interface AQIHeroProps {
    data: SensorReading;
}

export default function AQIHero({ data }: AQIHeroProps) {
    return (
        <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01]"
            style={{ background: getAqiGradient(data.aqi) }}
        >
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <Activity size={200} />
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-medium opacity-90">Current Air Quality</h2>
                        <p className="text-sm opacity-75 mt-1">
                            Last updated: {formatTimestamp(data.timestamp)}
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold border border-white/20">
                        {data.aqiCategory}
                    </div>
                </div>

                <div className="my-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl sm:text-9xl font-bold tracking-tighter">
                            {data.aqi}
                        </span>
                        <span className="text-2xl sm:text-3xl font-medium opacity-80">AQI</span>
                    </div>
                </div>

                <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-sm sm:text-base leading-relaxed font-medium">
                        Health Advisory: {getHealthMessage(data.aqiCategory)}
                    </p>
                </div>
            </div>
        </div>
    );
}
