import { getAqiColor } from '../../utils/aqiColors';

interface AQIScaleProps {
    currentAqi: number;
}

export default function AQIScale({ currentAqi }: AQIScaleProps) {
    const categories = [
        { label: 'Good', min: 0, max: 50 },
        { label: 'Moderate', min: 51, max: 100 },
        { label: 'Poor', min: 101, max: 150 },
        { label: 'Unhealthy', min: 151, max: 200 },
        { label: 'Severe', min: 201, max: 300 },
        { label: 'Hazardous', min: 301, max: 500 },
    ];

    // Calculate percentage position (capped at 100%)
    const percentage = Math.min((currentAqi / 500) * 100, 100);

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hidden sm:block">

            <div className="relative pt-6 pb-2">
                {/* Color segments */}
                <div className="h-3 w-full rounded-full flex overflow-hidden">
                    {categories.map((cat, idx) => (
                        <div
                            key={cat.label}
                            style={{
                                width: `${((cat.max - cat.min + (idx === 0 ? 1 : 0)) / 500) * 100}%`,
                                backgroundColor: getAqiColor(cat.max)
                            }}
                            className="h-full first:rounded-l-full last:rounded-r-full"
                        />
                    ))}
                </div>

                {/* Labels above bar (as seen in common designs) - interleaved to avoid collision if needed, 
            but for now simple flex distribution */}
                <div className="absolute top-0 left-0 right-0 flex justify-between text-xs font-semibold text-gray-400 px-1">
                    {categories.map(cat => (
                        <div key={cat.label} style={{ width: `${((cat.max - cat.min) / 500) * 100}%` }} className="text-center">
                            {cat.label}
                        </div>
                    ))}
                </div>

                {/* Tick marks below */}
                <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-2 px-0.5">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                    <span>200</span>
                    <span>300</span>
                    <span>301+</span>
                </div>


                {/* Indicator */}
                <div
                    className="absolute top-5 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-gray-900 rounded-full shadow-md z-10 transition-all duration-500 ease-out transform -translate-x-1/2"
                    style={{ left: `${percentage}%`, top: '1.2rem' }} // Align roughly with bar center
                />
            </div>
        </div>
    );
}
