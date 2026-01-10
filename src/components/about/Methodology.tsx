import { useState } from 'react';
import { ChevronDown, ChevronUp, Database, Brain, Wifi, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

const methodologySteps = [
    {
        icon: Wifi,
        title: 'Data Collection',
        summary: 'Real-time sensor data from our solar-powered monitoring stations',
        details: [
            'PMS7003MT sensor measures PM2.5 and PM10 particulate matter with laser scattering technology',
            'MiCS-6814 gas sensor detects CO, NO2, and NH3 concentrations',
            'Neo 6M GPS module provides precise location coordinates',
            'Data transmitted every 5 minutes via IoT connectivity',
            'All sensors calibrated against reference-grade equipment'
        ]
    },
    {
        icon: Database,
        title: 'Data Processing',
        summary: 'Validation, cleaning, and storage in Firebase Realtime Database',
        details: [
            'Outlier detection removes erroneous readings',
            'Data validation ensures sensor accuracy',
            'Timestamp synchronization across all sensors',
            'Secure storage in Firebase with redundancy',
            'Historical data archived for trend analysis'
        ]
    },
    {
        icon: BarChart3,
        title: 'AQI Calculation',
        summary: 'Computing Air Quality Index using Indian CPCB standards',
        details: [
            'Individual pollutant sub-indices calculated using CPCB breakpoint tables',
            'PM2.5, PM10, CO, NO2, and NH3 concentrations converted to AQI scale (0-500)',
            'Overall AQI determined by the highest sub-index (worst pollutant)',
            'Health categories assigned: Good, Moderate, Unhealthy for Sensitive Groups, Unhealthy, Very Unhealthy, Hazardous',
            'Real-time updates reflect current air quality conditions'
        ]
    },
    {
        icon: Brain,
        title: 'AI Predictions',
        summary: 'LSTM neural network forecasts future air quality trends',
        details: [
            'Long Short-Term Memory (LSTM) model trained on historical AQI data',
            'Considers temporal patterns, seasonal variations, and trends',
            'Predicts AQI for next 24 hours, 7 days, and 30 days',
            'Model continuously updated with new data for improved accuracy',
            'Confidence intervals provided for prediction reliability'
        ]
    }
];

export default function Methodology() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Our Methodology
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                From sensor to screen: How we collect, process, and present air quality data
            </p>

            <div className="space-y-4">
                {methodologySteps.map((step, index) => {
                    const Icon = step.icon;
                    const isExpanded = expandedIndex === index;

                    return (
                        <div 
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Header */}
                            <button
                                onClick={() => toggleExpand(index)}
                                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                aria-expanded={isExpanded}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold text-primary">
                                                Step {index + 1}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {step.summary}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-gray-500">
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            {/* Expandable Details */}
                            <div
                                className={clsx(
                                    'transition-all duration-300 ease-in-out overflow-hidden',
                                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                )}
                            >
                                <div className="px-6 pb-6 pt-2">
                                    <div className="pl-16">
                                        <ul className="space-y-3">
                                            {step.details.map((detail, detailIndex) => (
                                                <li 
                                                    key={detailIndex}
                                                    className="flex items-start gap-3 text-gray-700"
                                                >
                                                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                                                    <span className="text-sm leading-relaxed">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* AQI Formula Section */}
            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    AQI Calculation Formula
                </h3>
                <p className="text-gray-700 mb-4">
                    We follow the Indian Central Pollution Control Board (CPCB) standards for AQI calculation:
                </p>
                <div className="bg-white rounded-lg p-6 font-mono text-sm">
                    <p className="text-gray-800 mb-2">
                        <strong>Sub-Index (I<sub>p</sub>) =</strong>
                    </p>
                    <p className="text-gray-700 ml-4">
                        [(I<sub>Hi</sub> - I<sub>Lo</sub>) / (BP<sub>Hi</sub> - BP<sub>Lo</sub>)] × (C<sub>p</sub> - BP<sub>Lo</sub>) + I<sub>Lo</sub>
                    </p>
                    <div className="mt-4 text-xs text-gray-600 space-y-1">
                        <p>Where:</p>
                        <p>• I<sub>p</sub> = Sub-index for pollutant p</p>
                        <p>• C<sub>p</sub> = Concentration of pollutant p</p>
                        <p>• BP<sub>Hi</sub> = Breakpoint ≥ C<sub>p</sub></p>
                        <p>• BP<sub>Lo</sub> = Breakpoint ≤ C<sub>p</sub></p>
                        <p>• I<sub>Hi</sub> = AQI value corresponding to BP<sub>Hi</sub></p>
                        <p>• I<sub>Lo</sub> = AQI value corresponding to BP<sub>Lo</sub></p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                    <strong>Overall AQI</strong> is the maximum of all sub-indices, representing the worst pollutant.
                </p>
            </div>
        </section>
    );
}
