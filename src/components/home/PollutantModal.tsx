import { X, AlertCircle, TrendingUp, Shield } from 'lucide-react';
import { pollutantDetails } from '../../data/pollutantDetails';
import { useEffect, useState } from 'react';
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import type { SensorReading } from '../../types/sensor';

interface PollutantModalProps {
    pollutantId: string;
    currentValue: number;
    unit: string;
    onClose: () => void;
}

export default function PollutantModal({ pollutantId, currentValue, unit, onClose }: PollutantModalProps) {
    const [historicalData, setHistoricalData] = useState<{ timestamp: number; value: number }[]>([]);
    const [loading, setLoading] = useState(true);
    
    const detail = pollutantDetails[pollutantId];

    useEffect(() => {
        // Fetch last 24 readings for the graph
        const readingsRef = ref(database, 'readings');
        const recentQuery = query(readingsRef, orderByChild('timestamp'), limitToLast(24));

        const unsubscribe = onValue(recentQuery, (snapshot) => {
            const data: { timestamp: number; value: number }[] = [];
            snapshot.forEach((child) => {
                const reading = child.val() as SensorReading;
                let value = 0;
                
                // Map pollutant ID to sensor reading field
                switch (pollutantId) {
                    case 'PM2_5':
                        value = reading.pm25;
                        break;
                    case 'PM10':
                        value = reading.pm10;
                        break;
                    case 'CO':
                        value = reading.gas1_ppm * 1.145; // Convert to mg/m³
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
            });
            
            setHistoricalData(data.sort((a, b) => a.timestamp - b.timestamp));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [pollutantId]);

    if (!detail) return null;

    // Calculate min and max for graph scaling
    const values = historicalData.map(d => d.value);
    const minValue = Math.min(...values, 0);
    const maxValue = Math.max(...values, currentValue);
    const range = maxValue - minValue || 1;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 rounded-t-3xl flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-1">{detail.name}</h2>
                        <p className="text-white/90 text-sm">{detail.fullName}</p>
                        <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                            <span className="text-white text-2xl font-bold">{currentValue.toFixed(2)}</span>
                            <span className="text-white/90 text-sm ml-2">{unit}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Historical Graph */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-bold text-gray-900">24-Hour Trend</h3>
                        </div>
                        
                        {loading ? (
                            <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                                <p className="text-gray-500">Loading data...</p>
                            </div>
                        ) : historicalData.length > 0 ? (
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="relative h-48">
                                    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                                        {/* Grid lines */}
                                        {[0, 25, 50, 75, 100].map((percent) => (
                                            <line
                                                key={percent}
                                                x1="0"
                                                y1={200 - (percent * 2)}
                                                x2="800"
                                                y2={200 - (percent * 2)}
                                                stroke="#e5e7eb"
                                                strokeWidth="1"
                                            />
                                        ))}
                                        
                                        {/* Line graph */}
                                        <polyline
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="3"
                                            points={historicalData.map((point, index) => {
                                                const x = (index / (historicalData.length - 1)) * 800;
                                                const y = 200 - ((point.value - minValue) / range) * 180 - 10;
                                                return `${x},${y}`;
                                            }).join(' ')}
                                        />
                                        
                                        {/* Area fill */}
                                        <polygon
                                            fill="url(#areaGradient)"
                                            points={
                                                historicalData.map((point, index) => {
                                                    const x = (index / (historicalData.length - 1)) * 800;
                                                    const y = 200 - ((point.value - minValue) / range) * 180 - 10;
                                                    return `${x},${y}`;
                                                }).join(' ') + ' 800,200 0,200'
                                            }
                                        />
                                        
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3B82F6" />
                                                <stop offset="100%" stopColor="#8B5CF6" />
                                            </linearGradient>
                                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>24h ago</span>
                                    <span>Now</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                                <p className="text-gray-500">No historical data available</p>
                            </div>
                        )}
                    </div>

                    {/* Health Impacts */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <h3 className="text-xl font-bold text-gray-900">Health Impacts</h3>
                        </div>
                        <div className="space-y-3">
                            {detail.healthImpacts.map((impact, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-xl p-4 border-l-4"
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
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-gray-900">{impact.level}</span>
                                        <span className="text-sm text-gray-600 font-mono">{impact.range}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {impact.effects.map((effect, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                                <span className="text-gray-400 mt-1">•</span>
                                                <span>{effect}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reduction Methods */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5 text-green-500" />
                            <h3 className="text-xl font-bold text-gray-900">How to Reduce Exposure</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {detail.reductionMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-900 text-sm">{method.title}</h4>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                                method.effectiveness === 'High'
                                                    ? 'bg-green-200 text-green-800'
                                                    : method.effectiveness === 'Medium'
                                                    ? 'bg-yellow-200 text-yellow-800'
                                                    : 'bg-gray-200 text-gray-800'
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

                    {/* Sources */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-2">Common Sources</h4>
                        <div className="flex flex-wrap gap-2">
                            {detail.sources.map((source, index) => (
                                <span
                                    key={index}
                                    className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200"
                                >
                                    {source}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
