import { Shield, ArrowRight } from 'lucide-react';
import type { SensorReading } from '../../types/sensor';


interface ComparisonHeroProps {
    data: SensorReading;
}

export default function ComparisonHero({ data }: ComparisonHeroProps) {
    // Mock Outdoor Data (Delhi Average)
    const outdoorAQI = 359;
    const outdoorStatus = "Hazardous";
    const outdoorColor = "bg-aqi-hazardous"; // Using new tailwind color
    // const outdoorText = "text-white"; // unused

    // Indoor Data
    const indoorAQI = data.aqi;
    // Determine indoor color class based on value
    // Since we don't have a utility that returns class names, we'll map manually or use inline styles 
    // tailored to our new config.
    const getIndoorColorClass = (aqi: number) => {
        if (aqi <= 50) return 'bg-aqi-good';
        if (aqi <= 100) return 'bg-aqi-moderate';
        if (aqi <= 150) return 'bg-aqi-unhealthy_sensitive';
        if (aqi <= 200) return 'bg-aqi-unhealthy';
        if (aqi <= 300) return 'bg-aqi-very_unhealthy';
        return 'bg-aqi-hazardous';
    };

    const indoorColor = getIndoorColorClass(indoorAQI);

    // Improvement Calc
    const improvement = Math.round(((outdoorAQI - indoorAQI) / outdoorAQI) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-0 bg-white rounded-3xl overflow-hidden shadow-xl min-h-[400px]">
            {/* Outdoor Section */}
            <div className={`relative p-8 flex flex-col justify-center items-center text-center ${outdoorColor} text-white`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 animate-pulse-slow">
                    <h3 className="text-xl font-medium opacity-90 mb-2 uppercase tracking-widest">Outside Air</h3>
                    <div className="text-[5rem] sm:text-[7rem] font-bold leading-none tracking-tighter">
                        {outdoorAQI}
                    </div>
                    <div className="text-2xl font-semibold mt-2 opacity-90">{outdoorStatus}</div>
                    <p className="mt-4 text-sm opacity-75 max-w-xs mx-auto">
                        High pollution detected in your area. Keep windows closed.
                    </p>
                </div>
            </div>

            {/* Indoor Section */}
            <div className={`relative p-8 flex flex-col justify-center items-center text-center ${indoorColor} text-white transition-colors duration-1000`}>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-medium opacity-90 mb-2 uppercase tracking-widest">Inside Air</h3>
                    <div className="text-[5rem] sm:text-[7rem] font-bold leading-none tracking-tighter">
                        {indoorAQI}
                    </div>
                    <div className="text-2xl font-semibold mt-2 opacity-90">{data.aqiCategory}</div>

                    <div className="mt-6 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                        <Shield className="w-5 h-5 fill-current" />
                        <span className="font-bold">{improvement}% Cleaner</span>
                    </div>
                </div>
            </div>

            {/* Central Badge (Desktop only overlay) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg z-20">
                <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>
        </div>
    );
}
