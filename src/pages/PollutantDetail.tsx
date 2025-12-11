import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import { pollutantDetails } from '../data/pollutantDetails';
import type { SensorReading } from '../types/sensor';
import { ArrowLeft, TrendingUp, AlertCircle, Shield, Info } from 'lucide-react';
import { getPollutantStatus } from '../constants/airQualityStandards';

export default function PollutantDetail() {
    const { pollutantId } = useParams<{ pollutantId: string }>();
    const navigate = useNavigate();
    const [historicalData, setHistoricalData] = useState<{ timestamp: number; value: number }[]>([]);
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const detail = pollutantId ? pollutantDetails[pollutantId] : null;

    // Get unit based on pollutant type
    const getUnit = (id: string): string => {
        switch (id) {
            case 'PM2_5':
            case 'PM10':
            case 'NO2':
                return 'µg/m³';
            case 'CO':
                return 'mg/m³';
            case 'NH3':
                return 'ppb';
            default:
                return 'ppm';
        }
    };

    const unit = pollutantId ? getUnit(pollutantId) : '';

    useEffect(() => {
        if (!pollutantId) return;

        const readingsRef = ref(database, 'readings');
        const recentQuery = query(readingsRef, orderByChild('timestamp'), limitToLast(48));

        const unsubscribe = onValue(recentQuery, (snapshot) => {
            const data: { timestamp: number; value: number }[] = [];
            let latestValue = 0;

            snapshot.forEach((child) => {
                const reading = child.val() as SensorReading;
                let value = 0;

                switch (pollutantId) {
                    case 'PM2_5':
                        value = reading.pm25;
                        break;
                    case 'PM10':
                        value = reading.pm10;
                        break;
                    case 'CO':
                        value = reading.gas1_ppm * 1.145;
                        break;
                    case 'NO2':
                        value = reading.gas2_ppm;
                        break;
                    case 'NH3':
                        value = reading.gas3_ppm;
                        break;
                }

                data.push({
                    timestamp: reading.timestamp,
                    value: value
                });
                latestValue = value;
            });

            const sortedData = data.sort((a, b) => a.timestamp - b.timestamp);
            setHistoricalData(sortedData);
            setCurrentValue(latestValue);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [pollutantId]);

    if (!detail || !pollutantId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Pollutant not found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary hover:underline"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const status = getPollutantStatus(pollutantId, currentValue);

    // Calculate graph metrics
    const values = historicalData.map(d => d.value);
    const minValue = Math.min(...values, 0);
    const maxValue = Math.max(...values, currentValue);
    const range = maxValue - minValue || 1;

    // Calculate Y-axis labels (5 evenly spaced values)
    const yAxisLabels = Array.from({ length: 5 }, (_, i) => {
        const value = minValue + (range * (4 - i) / 4);
        return value.toFixed(1);
    });

    // Calculate X-axis labels (time points)
    const getTimeLabel = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const xAxisLabels = historicalData.length > 0 ? [
        getTimeLabel(historicalData[0].timestamp),
        getTimeLabel(historicalData[Math.floor(historicalData.length / 2)].timestamp),
        getTimeLabel(historicalData[historicalData.length - 1].timestamp)
    ] : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 mb-8 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{detail.name}</h1>
                            <p className="text-white/90 text-lg mb-4">{detail.fullName}</p>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <span className="text-white text-3xl font-bold">{currentValue.toFixed(2)}</span>
                                    <span className="text-white/90 text-lg ml-2">{unit}</span>
                                </div>
                                <div
                                    className="px-4 py-2 rounded-lg font-semibold text-white"
                                    style={{ backgroundColor: status.color }}
                                >
                                    {status.status}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                            <Info className="w-6 h-6 mb-2" />
                            <p className="text-sm">{status.message}</p>
                        </div>
                    </div>
                </div>

                {/* Graph Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-gray-900">48-Hour Trend Analysis</h2>
                    </div>

                    {loading ? (
                        <div className="h-96 bg-gray-50 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-gray-500">Loading data...</p>
                            </div>
                        </div>
                    ) : historicalData.length > 0 ? (
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                            <div className="relative">
                                {/* Graph Container with proper padding for axes */}
                                <div className="flex">
                                    {/* Y-Axis */}
                                    <div className="flex flex-col justify-between pr-4 py-8" style={{ height: '400px' }}>
                                        {yAxisLabels.map((label, index) => (
                                            <div key={index} className="text-sm font-medium text-gray-600 text-right">
                                                {label}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Graph */}
                                    <div className="flex-1">
                                        <svg className="w-full" style={{ height: '400px' }} viewBox="0 0 1000 400" preserveAspectRatio="none">
                                            {/* Horizontal grid lines */}
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <line
                                                    key={`h-grid-${i}`}
                                                    x1="0"
                                                    y1={i * 100}
                                                    x2="1000"
                                                    y2={i * 100}
                                                    stroke="#e5e7eb"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />
                                            ))}

                                            {/* Vertical grid lines */}
                                            {[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => (
                                                <line
                                                    key={`v-grid-${i}`}
                                                    x1={fraction * 1000}
                                                    y1="0"
                                                    x2={fraction * 1000}
                                                    y2="400"
                                                    stroke="#e5e7eb"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />
                                            ))}

                                            {/* Area fill */}
                                            <polygon
                                                fill="url(#areaGradient)"
                                                points={
                                                    historicalData.map((point, index) => {
                                                        const x = (index / (historicalData.length - 1)) * 1000;
                                                        const normalizedValue = (point.value - minValue) / range;
                                                        const y = 400 - (normalizedValue * 380) - 10;
                                                        return `${x},${y}`;
                                                    }).join(' ') + ' 1000,400 0,400'
                                                }
                                            />

                                            {/* Line graph */}
                                            <polyline
                                                fill="none"
                                                stroke="url(#lineGradient)"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                points={historicalData.map((point, index) => {
                                                    const x = (index / (historicalData.length - 1)) * 1000;
                                                    const normalizedValue = (point.value - minValue) / range;
                                                    const y = 400 - (normalizedValue * 380) - 10;
                                                    return `${x},${y}`;
                                                }).join(' ')}
                                            />

                                            {/* Data points */}
                                            {historicalData.map((point, index) => {
                                                if (index % Math.ceil(historicalData.length / 12) !== 0 && index !== historicalData.length - 1) return null;
                                                const x = (index / (historicalData.length - 1)) * 1000;
                                                const normalizedValue = (point.value - minValue) / range;
                                                const y = 400 - (normalizedValue * 380) - 10;
                                                return (
                                                    <circle
                                                        key={`point-${index}`}
                                                        cx={x}
                                                        cy={y}
                                                        r="5"
                                                        fill="white"
                                                        stroke="#3B82F6"
                                                        strokeWidth="3"
                                                    />
                                                );
                                            })}

                                            <defs>
                                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#3B82F6" />
                                                    <stop offset="50%" stopColor="#8B5CF6" />
                                                    <stop offset="100%" stopColor="#EC4899" />
                                                </linearGradient>
                                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* X-Axis labels */}
                                        <div className="flex justify-between mt-2 px-2">
                                            {xAxisLabels.map((label, index) => (
                                                <div key={index} className="text-sm font-medium text-gray-600">
                                                    {label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Axis labels */}
                                <div className="mt-4 text-center">
                                    <p className="text-sm font-semibold text-gray-700">Time</p>
                                </div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90">
                                    <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                        Concentration ({unit})
                                    </p>
                                </div>
                            </div>

                            {/* Graph Statistics */}
                            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Average</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">{unit}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Peak</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {maxValue.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">{unit}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Minimum</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {minValue.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">{unit}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-96 bg-gray-50 rounded-xl flex items-center justify-center">
                            <p className="text-gray-500">No historical data available</p>
                        </div>
                    )}
                </div>

                {/* Health Impacts Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Health Impact Levels</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {detail.healthImpacts.map((impact, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-l-4 hover:shadow-md transition-shadow"
                                style={{
                                    borderColor:
                                        impact.level === 'Good' ? '#2ECC71' :
                                        impact.level === 'Satisfactory' ? '#A8E05F' :
                                        impact.level === 'Moderate' ? '#F1C40F' :
                                        impact.level === 'Poor' ? '#E67E22' :
                                        impact.level === 'Very Poor' ? '#E74C3C' :
                                        '#7E0023'
                                }}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="font-bold text-lg text-gray-900">{impact.level}</span>
                                    <span className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded-full">
                                        {impact.range}
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {impact.effects.map((effect, idx) => (
                                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                            <span className="text-primary mt-1 font-bold">•</span>
                                            <span>{effect}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reduction Methods Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-6 h-6 text-green-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Protection & Reduction Methods</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {detail.reductionMethods.map((method, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-900 text-lg">{method.title}</h3>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-bold ${
                                            method.effectiveness === 'High'
                                                ? 'bg-green-500 text-white'
                                                : method.effectiveness === 'Medium'
                                                ? 'bg-yellow-400 text-gray-900'
                                                : 'bg-gray-300 text-gray-700'
                                        }`}
                                    >
                                        {method.effectiveness}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{method.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sources Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 mb-8">
                    <h3 className="font-bold text-xl text-blue-900 mb-4">Common Sources</h3>
                    <div className="flex flex-wrap gap-3">
                        {detail.sources.map((source, index) => (
                            <span
                                key={index}
                                className="bg-white text-blue-700 text-sm px-4 py-2 rounded-full border-2 border-blue-200 font-medium hover:bg-blue-100 transition-colors"
                            >
                                {source}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cigarette Equivalent - Contextual Information */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-200">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-red-500 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Understanding the Impact</h3>
                            <p className="text-gray-700">
                                Air pollution exposure can be compared to cigarette smoking to help understand health risks. 
                                This pollutant contributes to the overall air quality and your daily exposure.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 border border-red-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-bold text-red-600">Did you know?</span> Research shows that breathing air with an AQI of 22 for 24 hours 
                            is equivalent to smoking one cigarette. The current levels of <span className="font-semibold">{detail.name}</span> contribute 
                            to the overall air quality index. Check the main dashboard to see your total daily cigarette equivalent exposure from all pollutants combined.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5"
                        >
                            View Total Exposure on Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
