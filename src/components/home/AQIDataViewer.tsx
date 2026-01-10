import { useState } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import AQIRealtimeMonitor from './AQIRealtimeMonitor';
import AQITrendGraph from './AQITrendGraph';

interface AQIDataViewerProps {
    currentAQI: number;
    onCityChange?: (city: 'pune' | 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'hyderabad' | 'ahmedabad' | 'lucknow', currentAQI: number) => void;
}

type TabType = 'historical' | 'realtime';

export default function AQIDataViewer({ currentAQI, onCityChange }: AQIDataViewerProps) {
    const [activeTab, setActiveTab] = useState<TabType>('historical');

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Tab Header */}
            <div className="bg-gradient-to-r from-primary to-secondary">
                <div className="flex border-b border-white/20">
                    <button
                        onClick={() => setActiveTab('historical')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                            activeTab === 'historical'
                                ? 'bg-white text-primary'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span className="hidden sm:inline">Historical Air Quality Data</span>
                        <span className="sm:hidden">Historical</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('realtime')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                            activeTab === 'realtime'
                                ? 'bg-white text-primary'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        <Activity className="w-5 h-5" />
                        <span className="hidden sm:inline">Real-Time AQI Monitor</span>
                        <span className="sm:hidden">Real-Time</span>
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-0">
                {activeTab === 'historical' ? (
                    <div className="p-6 sm:p-8">
                        <AQITrendGraph onCityChange={onCityChange} />
                    </div>
                ) : (
                    <AQIRealtimeMonitor currentAQI={currentAQI} />
                )}
            </div>
        </div>
    );
}
