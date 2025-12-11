import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPollutantStatus } from '../../constants/airQualityStandards';
import type { SensorReading } from '../../types/sensor';

interface PollutantTabsProps {
    data: SensorReading;
}

interface PollutantDetail {
    id: string;
    name: string;
    fullName: string;
    value: number;
    unit: string;
    description: string;
    healthEffects: string;
}

export default function PollutantTabs({ data }: PollutantTabsProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'pollutants' | 'scale'>('pollutants');
    const [expandedPollutant, setExpandedPollutant] = useState<string | null>(null);

    // Prepare pollutant data
    const pollutants: PollutantDetail[] = [
        {
            id: 'PM2_5',
            name: 'PM₂.₅',
            fullName: 'Fine Particulate Matter',
            value: data.pm25,
            unit: 'µg/m³',
            description: 'Fine Particulate Matter are inhalable pollutant particles with a diameter less than 2.5 micrometers that can enter the lungs and bloodstream, resulting in serious health issues.',
            healthEffects: 'The most severe health effects include cardiovascular disease, respiratory infections, and premature death. Long-term exposure can lead to chronic bronchitis and reduced lung function.'
        },
        {
            id: 'PM10',
            name: 'PM₁₀',
            fullName: 'Coarse Particulate Matter',
            value: data.pm10,
            unit: 'µg/m³',
            description: 'Coarse Particulate Matter are inhalable particles with diameters between 2.5 and 10 micrometers that can be deposited in airways, resulting in health issues.',
            healthEffects: 'Exposure can cause irritation of airways, coughing, difficulty breathing, and aggravation of asthma. People with heart or lung disease are at higher risk.'
        },
        {
            id: 'NO2',
            name: 'NO₂',
            fullName: 'Nitrogen Dioxide',
            value: data.gas2_ppm,
            unit: 'µg/m³',
            description: 'Breathing in high levels of Nitrogen Dioxide increases the risk of respiratory problems. Coughing and difficulty breathing are common.',
            healthEffects: 'More serious health issues such as respiratory infections, reduced lung function, and aggravation of asthma can occur with prolonged exposure. Children and elderly are most vulnerable.'
        },
        {
            id: 'CO',
            name: 'CO',
            fullName: 'Carbon Monoxide',
            value: data.gas1_ppm * 1.145,
            unit: 'µg/m³',
            description: 'Carbon Monoxide is a colourless and odourless gas and when inhaled at high levels can cause headache, nausea, dizziness, and vomiting.',
            healthEffects: 'Repeated long-term exposure can lead to heart disease and neurological damage. At very high levels, CO can cause loss of consciousness and death.'
        },
    ];

    const aqiScaleLevels = [
        {
            level: 'Good',
            range: '(0 to 50)',
            color: '#00E400',
            description: 'Air quality is satisfactory, and air pollution poses little or no health concerns.'
        },
        {
            level: 'Moderate',
            range: '(51 to 100)',
            color: '#FFFF00',
            description: 'Air quality is acceptable for most, but sensitive individuals might experience mild discomfort.'
        },
        {
            level: 'Poor',
            range: '(101 to 150)',
            color: '#FF7E00',
            description: 'Breathing may become slightly uncomfortable, especially for those with respiratory issues.'
        },
        {
            level: 'Unhealthy',
            range: '(151 to 200)',
            color: '#ba4444ff',
            description: 'This air quality is particularly risky for children, pregnant women, and the elderly. Limit outdoor activities.'
        },
        {
            level: 'Severe',
            range: '(201 to 300)',
            color: '#8F3F97',
            description: 'Prolonged exposure can cause chronic health issues or organ damage. Avoid outdoor activities.'
        },
        {
            level: 'Hazardous',
            range: '(301+)',
            color: '#FF0000',
            description: 'Dangerously high pollution levels. Life-threatening health risks with prolonged exposure. Stay indoors and take precautions.'
        }
    ];

    const toggleExpand = (pollutantId: string) => {
        setExpandedPollutant(expandedPollutant === pollutantId ? null : pollutantId);
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('pollutants')}
                    className={`flex-1 px-6 py-4 text-left font-semibold transition-all relative ${
                        activeTab === 'pollutants'
                            ? 'text-gray-900 bg-white'
                            : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                    Current Pollutants
                    {activeTab === 'pollutants' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('scale')}
                    className={`flex-1 px-6 py-4 text-left font-semibold transition-all relative ${
                        activeTab === 'scale'
                            ? 'text-gray-900 bg-white'
                            : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                    Air Quality Scale
                    {activeTab === 'scale' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'pollutants' ? (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <span className="text-sm text-gray-500 font-medium">Over the past hour</span>
                        </div>

                        {pollutants.map((pollutant) => {
                            const status = getPollutantStatus(pollutant.id, pollutant.value);
                            const isExpanded = expandedPollutant === pollutant.id;

                            return (
                                <div
                                    key={pollutant.id}
                                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all cursor-pointer"
                                    onClick={() => navigate(`/pollutant/${pollutant.id}`)}
                                >
                                    <div className="p-4 flex items-start justify-between gap-4">
                                        {/* Left: Pollutant Name and Status */}
                                        <div className="flex-shrink-0" style={{ minWidth: '100px' }}>
                                            <div className="text-2xl font-bold text-gray-900 mb-2">
                                                {pollutant.name}
                                            </div>
                                            <div
                                                className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    backgroundColor: `${status.color}20`,
                                                    color: status.color,
                                                    borderLeft: `4px solid ${status.color}`
                                                }}
                                            >
                                                {status.status}
                                            </div>
                                        </div>

                                        {/* Middle: Description */}
                                        <div className="flex-1">
                                            <div className="flex items-start gap-2 mb-2">
                                                <span className="font-bold text-gray-900">{pollutant.fullName}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/pollutant/${pollutant.id}`);
                                                    }}
                                                    className="text-gray-400 hover:text-primary transition-colors"
                                                    title="View detailed analysis"
                                                >
                                                    <ExternalLink className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {pollutant.description}
                                                {!isExpanded && pollutant.healthEffects && (
                                                    <span className="text-gray-500">...</span>
                                                )}
                                            </p>
                                            {isExpanded && (
                                                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                                                    {pollutant.healthEffects}
                                                </p>
                                            )}
                                            <button
                                                onClick={() => toggleExpand(pollutant.id)}
                                                className="text-sm text-primary font-semibold mt-2 hover:underline flex items-center gap-1"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        less <ChevronUp className="w-4 h-4" />
                                                    </>
                                                ) : (
                                                    <>
                                                        more <ChevronDown className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Right: Value */}
                                        <div className="flex-shrink-0 text-right">
                                            <div className="text-3xl font-bold text-gray-900">
                                                {pollutant.value.toFixed(0)}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {pollutant.unit}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        
                    </div>
                ) : (
                    <div className="space-y-3">
                        {aqiScaleLevels.map((level, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
                            >
                                {/* Color Indicator */}
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 rounded-lg shadow-sm"
                                        style={{ backgroundColor: level.color }}
                                    />
                                </div>

                                {/* Level Info */}
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{level.level}</h3>
                                        <span className="text-sm text-gray-500 font-medium">{level.range}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {level.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
