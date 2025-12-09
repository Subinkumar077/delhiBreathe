import { useState, useEffect } from 'react';
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import type { SensorReading } from '../../types/sensor';
import { TrendingUp, Clock } from 'lucide-react';

export default function AQITrendGraph() {
    const [historicalData, setHistoricalData] = useState<{ timestamp: number; aqi: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'24h' | '12h' | '6h'>('24h');

    useEffect(() => {
        // Fetch readings based on time range
        const limit = timeRange === '24h' ? 48 : timeRange === '12h' ? 24 : 12;
        const readingsRef = ref(database, 'readings');
        const recentQuery = query(readingsRef, orderByChild('timestamp'), limitToLast(limit));

        const unsubscribe = onValue(recentQuery, (snapshot) => {
            const data: { timestamp: number; aqi: number }[] = [];
            snapshot.forEach((child) => {
                const reading = child.val() as SensorReading;
                data.push({
                    timestamp: reading.timestamp,
                    aqi: reading.aqi
                });
            });
            
            setHistoricalData(data.sort((a, b) => a.timestamp - b.timestamp));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [timeRange]);

    if (loading) {
        return (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Loading AQI trend...</p>
                </div>
            </div>
        );
    }

    if (historicalData.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">No historical data available</p>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const aqiValues = historicalData.map(d => d.aqi);
    const currentAQI = aqiValues[aqiValues.length - 1];
    const avgAQI = Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length);
    const maxAQI = Math.max(...aqiValues);
    const minAQI = Math.min(...aqiValues);

    // Calculate graph dimensions
    const minValue = Math.max(0, minAQI - 20);
    const maxValue = maxAQI + 20;
    const range = maxValue - minValue || 1;

    // Get AQI color based on value
    const getAQIColor = (aqi: number): string => {
        if (aqi <= 50) return '#00E400';
        if (aqi <= 100) return '#FFFF00';
        if (aqi <= 150) return '#FF7E00';
        if (aqi <= 200) return '#ba4444ff';
        if (aqi <= 300) return '#8F3F97';
        return '#FF0000';
    };

    // Format time labels
    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    };

    // Get time labels for x-axis
    const getTimeLabels = () => {
        if (historicalData.length === 0) return [];
        const labels = [];
        const step = Math.floor(historicalData.length / 6);
        for (let i = 0; i < historicalData.length; i += step) {
            labels.push({
                index: i,
                time: formatTime(historicalData[i].timestamp)
            });
        }
        return labels;
    };

    const timeLabels = getTimeLabels();

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">AQI Trend</h2>
                        <p className="text-sm text-gray-500">Air quality over time</p>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                    {(['6h', '12h', '24h'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                timeRange === range
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                    <p className="text-xs text-blue-700 font-medium mb-1">Current</p>
                    <p className="text-2xl font-bold text-blue-900">{currentAQI}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                    <p className="text-xs text-green-700 font-medium mb-1">Average</p>
                    <p className="text-2xl font-bold text-green-900">{avgAQI}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 border border-red-200">
                    <p className="text-xs text-red-700 font-medium mb-1">Peak</p>
                    <p className="text-2xl font-bold text-red-900">{maxAQI}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
                    <p className="text-xs text-gray-700 font-medium mb-1">Lowest</p>
                    <p className="text-2xl font-bold text-gray-900">{minAQI}</p>
                </div>
            </div>

            {/* Graph */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200">
                <div className="relative" style={{ height: '300px' }}>
                    <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                        {/* Background grid lines */}
                        {[0, 50, 100, 150, 200, 250, 300, 400, 500].map((aqiLevel) => {
                            const y = 280 - ((aqiLevel - minValue) / range) * 260;
                            if (y >= 20 && y <= 280) {
                                return (
                                    <g key={aqiLevel}>
                                        <line
                                            x1="40"
                                            y1={y}
                                            x2="1000"
                                            y2={y}
                                            stroke="#e5e7eb"
                                            strokeWidth="1"
                                            strokeDasharray="4,4"
                                        />
                                        <text
                                            x="5"
                                            y={y + 4}
                                            fontSize="12"
                                            fill="#6b7280"
                                            fontWeight="500"
                                        >
                                            {aqiLevel}
                                        </text>
                                    </g>
                                );
                            }
                            return null;
                        })}

                        {/* AQI category background zones */}
                        <defs>
                            <linearGradient id="aqiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FF0000" stopOpacity="0.1" />
                                <stop offset="20%" stopColor="#8F3F97" stopOpacity="0.1" />
                                <stop offset="40%" stopColor="#ba4444ff" stopOpacity="0.1" />
                                <stop offset="60%" stopColor="#FF7E00" stopOpacity="0.1" />
                                <stop offset="80%" stopColor="#FFFF00" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#00E400" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>

                        {/* Area fill under the line */}
                        <polygon
                            fill="url(#areaGradient)"
                            points={
                                historicalData.map((point, index) => {
                                    const x = 40 + (index / (historicalData.length - 1)) * 960;
                                    const y = 280 - ((point.aqi - minValue) / range) * 260;
                                    return `${x},${y}`;
                                }).join(' ') + ' 1000,280 40,280'
                            }
                        />

                        {/* Main line */}
                        <polyline
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={historicalData.map((point, index) => {
                                const x = 40 + (index / (historicalData.length - 1)) * 960;
                                const y = 280 - ((point.aqi - minValue) / range) * 260;
                                return `${x},${y}`;
                            }).join(' ')}
                        />

                        {/* Data points */}
                        {historicalData.map((point, index) => {
                            const x = 40 + (index / (historicalData.length - 1)) * 960;
                            const y = 280 - ((point.aqi - minValue) / range) * 260;
                            const color = getAQIColor(point.aqi);
                            
                            return (
                                <g key={index}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="4"
                                        fill={color}
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                </g>
                            );
                        })}

                        {/* Current value indicator */}
                        {historicalData.length > 0 && (
                            <g>
                                <circle
                                    cx={40 + 960}
                                    cy={280 - ((currentAQI - minValue) / range) * 260}
                                    r="6"
                                    fill={getAQIColor(currentAQI)}
                                    stroke="white"
                                    strokeWidth="3"
                                />
                                <circle
                                    cx={40 + 960}
                                    cy={280 - ((currentAQI - minValue) / range) * 260}
                                    r="10"
                                    fill={getAQIColor(currentAQI)}
                                    opacity="0.3"
                                >
                                    <animate
                                        attributeName="r"
                                        from="10"
                                        to="16"
                                        dur="1.5s"
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="opacity"
                                        from="0.3"
                                        to="0"
                                        dur="1.5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </g>
                        )}

                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="50%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Time labels */}
                <div className="flex justify-between mt-3 px-2">
                    {timeLabels.map((label, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{label.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs">
                {[
                    { label: 'Good', color: '#00E400', range: '0-50' },
                    { label: 'Moderate', color: '#FFFF00', range: '51-100' },
                    { label: 'Poor', color: '#FF7E00', range: '101-150' },
                    { label: 'Unhealthy', color: '#ba4444ff', range: '151-200' },
                    { label: 'Severe', color: '#8F3F97', range: '201-300' },
                    { label: 'Hazardous', color: '#FF0000', range: '300+' }
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-700 font-medium">{item.label}</span>
                        <span className="text-gray-500">({item.range})</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
