import { useState, useEffect } from 'react';
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import type { SensorReading } from '../../types/sensor';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { CITIES, generateMockData } from '../../data/mockCityData';

type TimePeriod = '12h' | '24h' | '7d' | '30d' | '1y';
type CityKey = 'pune' | 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'hyderabad' | 'ahmedabad' | 'lucknow';

interface AQITrendGraphProps {
    onCityChange?: (city: CityKey, currentAQI: number) => void;
}

export default function AQITrendGraph({ onCityChange }: AQITrendGraphProps) {
    const [historicalData, setHistoricalData] = useState<{ timestamp: number; aqi: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('12h');
    const [selectedCity, setSelectedCity] = useState<CityKey>('pune');
    const [showTimePeriodMenu, setShowTimePeriodMenu] = useState(false);
    const [showCityMenu, setShowCityMenu] = useState(false);

    const timePeriodLabels: Record<TimePeriod, string> = {
        '12h': '12 Hours',
        '24h': '24 Hours',
        '7d': '7 Days',
        '30d': '30 Days',
        '1y': '1 Year'
    };

    useEffect(() => {
        setLoading(true);

        // Determine data point count based on time period
        let dataPointCount: number;
        switch (timePeriod) {
            case '12h':
                dataPointCount = 24;
                break;
            case '24h':
                dataPointCount = 48;
                break;
            case '7d':
                dataPointCount = 84; // 12 points per day
                break;
            case '30d':
                dataPointCount = 120; // 4 points per day
                break;
            case '1y':
                dataPointCount = 365; // 1 point per day
                break;
        }

        if (selectedCity === 'pune') {
            // Fetch real data from Firebase for Pune
            const readingsRef = ref(database, 'readings');
            const recentQuery = query(readingsRef, orderByChild('timestamp'), limitToLast(dataPointCount));

            const unsubscribe = onValue(recentQuery, (snapshot) => {
                const data: { timestamp: number; aqi: number }[] = [];
                snapshot.forEach((child) => {
                    const reading = child.val() as SensorReading;
                    // Validate timestamp
                    if (reading.timestamp && reading.timestamp > 0) {
                        data.push({
                            timestamp: reading.timestamp,
                            aqi: reading.aqi
                        });
                    }
                });
                
                // If no valid data from Firebase, use mock data
                if (data.length === 0) {
                    const mockData = generateMockData('pune', timePeriod, dataPointCount);
                    setHistoricalData(mockData);
                } else {
                    setHistoricalData(data.sort((a, b) => a.timestamp - b.timestamp));
                }
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            // Use mock data for other cities
            const mockData = generateMockData(selectedCity, timePeriod, dataPointCount);
            setHistoricalData(mockData);
            setLoading(false);
        }
    }, [timePeriod, selectedCity]);

    // Notify parent component of city change and current AQI
    useEffect(() => {
        if (onCityChange && historicalData.length > 0) {
            const currentAQI = historicalData[historicalData.length - 1].aqi;
            onCityChange(selectedCity, currentAQI);
        }
    }, [selectedCity, historicalData, onCityChange]);

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

    // Format time labels based on period
    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        if (timePeriod === '12h' || timePeriod === '24h') {
            return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
        } else if (timePeriod === '7d') {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (timePeriod === '30d') {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short' });
        }
    };

    // Get time labels for x-axis - show more distributed labels
    const getTimeLabels = () => {
        if (historicalData.length === 0) return [];
        const labels = [];
        const labelCount = Math.min(8, historicalData.length); // Show up to 8 labels
        
        for (let i = 0; i < labelCount; i++) {
            const index = Math.floor((i * (historicalData.length - 1)) / (labelCount - 1));
            const timestamp = historicalData[index]?.timestamp;
            
            // Validate timestamp
            if (timestamp && timestamp > 0) {
                labels.push({
                    index,
                    time: formatTime(timestamp)
                });
            }
        }
        return labels;
    };

    const timeLabels = getTimeLabels();

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            {/* Header with Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Historical Air Quality Data</h2>
                        <p className="text-sm text-gray-500">{CITIES[selectedCity].name}</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-2">
                    {/* City Selector */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowCityMenu(!showCityMenu);
                                setShowTimePeriodMenu(false);
                            }}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            {CITIES[selectedCity].name}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {showCityMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                {(Object.keys(CITIES) as CityKey[]).map((cityKey) => (
                                    <button
                                        key={cityKey}
                                        onClick={() => {
                                            setSelectedCity(cityKey);
                                            setShowCityMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                                            selectedCity === cityKey ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                                        }`}
                                    >
                                        {CITIES[cityKey].name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Time Period Selector */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowTimePeriodMenu(!showTimePeriodMenu);
                                setShowCityMenu(false);
                            }}
                            className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            {timePeriodLabels[timePeriod]}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {showTimePeriodMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                {(Object.keys(timePeriodLabels) as TimePeriod[]).map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => {
                                            setTimePeriod(period);
                                            setShowTimePeriodMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                                            timePeriod === period ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                                        }`}
                                    >
                                        {timePeriodLabels[period]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
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
                <div className="relative" style={{ height: '350px' }}>
                    <svg className="w-full h-full" viewBox="0 0 1000 350" preserveAspectRatio="xMidYMid meet">
                        {/* Background grid lines */}
                        {[0, 50, 100, 150, 200, 250].map((aqiLevel) => {
                            const y = 310 - ((aqiLevel - minValue) / range) * 280;
                            if (y >= 20 && y <= 310) {
                                return (
                                    <g key={aqiLevel}>
                                        <line
                                            x1="50"
                                            y1={y}
                                            x2="980"
                                            y2={y}
                                            stroke="#E5E7EB"
                                            strokeWidth="1"
                                            opacity="0.8"
                                        />
                                        <text
                                            x="10"
                                            y={y + 4}
                                            fontSize="11"
                                            fill="#6B7280"
                                            fontWeight="500"
                                        >
                                            {aqiLevel}
                                        </text>
                                    </g>
                                );
                            }
                            return null;
                        })}

                        {/* Y-axis label */}
                        <text
                            x="15"
                            y="15"
                            fontSize="12"
                            fill="#374151"
                            fontWeight="600"
                        >
                            AQI
                        </text>

                        {/* Bar chart */}
                        {historicalData.map((point, index) => {
                            const barWidth = Math.max(8, 900 / historicalData.length - 2);
                            const x = 60 + (index * (920 / historicalData.length));
                            const barHeight = ((point.aqi - minValue) / range) * 280;
                            const y = 310 - barHeight;
                            const color = getAQIColor(point.aqi);
                            
                            return (
                                <g key={index}>
                                    {/* Bar */}
                                    <rect
                                        x={x}
                                        y={y}
                                        width={barWidth}
                                        height={barHeight}
                                        fill={color}
                                        rx="2"
                                        opacity="0.9"
                                    />
                                    {/* Highlight on last bar */}
                                    {index === historicalData.length - 1 && (
                                        <rect
                                            x={x}
                                            y={y}
                                            width={barWidth}
                                            height={barHeight}
                                            fill="white"
                                            rx="2"
                                            opacity="0.3"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0.3;0.5;0.3"
                                                dur="2s"
                                                repeatCount="indefinite"
                                            />
                                        </rect>
                                    )}
                                </g>
                            );
                        })}

                        {/* X-axis line */}
                        <line
                            x1="50"
                            y1="310"
                            x2="980"
                            y2="310"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                        />

                        {/* Y-axis line */}
                        <line
                            x1="50"
                            y1="20"
                            x2="50"
                            y2="310"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* Time labels */}
                <div className="flex justify-between mt-3 px-2">
                    {timeLabels.map((label, idx) => (
                        <div key={idx} className="text-xs text-gray-600 font-medium">
                            {label.time}
                        </div>
                    ))}
                </div>

                {/* Date range labels */}
                <div className="flex justify-between mt-2 px-2">
                    {historicalData[0]?.timestamp > 0 && (
                        <div className="text-xs text-gray-700 font-semibold">
                            {new Date(historicalData[0].timestamp).toLocaleDateString('en-US', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                            })}
                        </div>
                    )}
                    <div className="text-xs text-gray-600 font-medium">Time</div>
                    {historicalData[historicalData.length - 1]?.timestamp > 0 && (
                        <div className="text-xs text-gray-700 font-semibold">
                            {new Date(historicalData[historicalData.length - 1].timestamp).toLocaleDateString('en-US', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                            })}
                        </div>
                    )}
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
