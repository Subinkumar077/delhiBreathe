import { Info } from 'lucide-react';
import { useState } from 'react';

export default function MapLegend() {
    const [isExpanded, setIsExpanded] = useState(false);

    const aqiLevels = [
        { label: 'Good', range: '0-50', color: '#4CAF50' },
        { label: 'Moderate', range: '51-100', color: '#FFEB3B' },
        { label: 'Poor', range: '101-150', color: '#FF9800' },
        { label: 'Unhealthy', range: '151-200', color: '#F44336' },
        { label: 'Severe', range: '201-300', color: '#9C27B0' },
        { label: 'Hazardous', range: '301+', color: '#7B1FA2' },
    ];

    return (
        <div className="absolute bottom-4 left-4 z-[400]">
            {isExpanded ? (
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-xs">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-sm text-gray-900">AQI Scale</h3>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Info size={18} />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {aqiLevels.map((level) => (
                            <div key={level.label} className="flex items-center gap-2">
                                <div
                                    className="w-8 h-4 rounded"
                                    style={{ backgroundColor: level.color }}
                                />
                                <div className="flex-1">
                                    <div className="text-xs font-semibold text-gray-900">{level.label}</div>
                                    <div className="text-[10px] text-gray-500">{level.range}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center border border-gray-200"
                    title="AQI Legend"
                >
                    <Info size={20} className="text-gray-700" />
                </button>
            )}
        </div>
    );
}
