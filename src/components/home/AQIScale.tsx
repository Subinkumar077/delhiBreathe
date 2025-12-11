interface AQIScaleProps {
    currentAqi: number;
}

export default function AQIScale({ currentAqi }: AQIScaleProps) {
    const categories = [
        { label: 'Good', min: 0, max: 50, color: '#00E400' },
        { label: 'Moderate', min: 51, max: 100, color: '#FFFF00' },
        { label: 'Poor', min: 101, max: 150, color: '#FF7E00' },
        { label: 'Unhealthy', min: 151, max: 200, color: '#ba4444ff' },
        { label: 'Severe', min: 201, max: 300, color: '#8F3F97' },
        { label: 'Hazardous', min: 301, max: 500, color: '#FF0000' },
    ];

    // Calculate percentage position (capped at 100%)
    const percentage = Math.min((currentAqi / 500) * 100, 100);

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hidden sm:block">
            <div className="relative pt-12 pb-2">
                {/* Color segments */}
                <div className="h-4 w-full rounded-full flex overflow-hidden shadow-md">
                    {categories.map((cat, idx) => (
                        <div
                            key={cat.label}
                            style={{
                                width: `${((cat.max - cat.min + (idx === 0 ? 1 : 0)) / 500) * 100}%`,
                                backgroundColor: cat.color
                            }}
                            className="h-full first:rounded-l-full last:rounded-r-full"
                        />
                    ))}
                </div>

                {/* Labels above bar with better spacing */}
                <div className="absolute top-0 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-700 px-1">
                    {categories.map((cat, idx) => (
                        <div 
                            key={cat.label} 
                            style={{ 
                                width: `${((cat.max - cat.min) / 500) * 100}%`,
                                textAlign: idx < 2 ? 'left' : idx === categories.length - 1 ? 'right' : 'center'
                            }} 
                            className="leading-tight"
                        >
                            <div className="whitespace-nowrap">{cat.label}</div>
                            <div className="text-gray-500 font-semibold mt-0.5">
                                {cat.min}-{cat.max === 500 ? '500+' : cat.max}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tick marks below */}
                
<div className="relative mt-2 h-4 w-full">
    {[
        { val: 0, label: "0" },
        { val: 50, label: "50" },
        { val: 100, label: "100" },
        { val: 150, label: "150" },
        { val: 200, label: "200" },
        { val: 300, label: "300" },
        { val: 500, label: "500+" },
    ].map((tick) => (
        <div
            key={tick.val}
            className="absolute text-[10px] text-gray-500 font-semibold -translate-x-1/2"
            style={{ left: `${(tick.val / 500) * 100}%` }}
        >
            {tick.label}
        </div>
    ))}
</div>


                {/* Indicator */}
                <div
                    className="absolute top-5 -translate-y-1/2 w-5 h-5 bg-white border-[3px] border-gray-900 rounded-full shadow-lg z-10 transition-all duration-500 ease-out transform -translate-x-1/2"
                    style={{ left: `${percentage}%`, top: '3.5rem' }}
                />
            </div>
        </div>
    );
}
