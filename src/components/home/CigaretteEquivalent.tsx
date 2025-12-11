import { Cigarette, AlertTriangle, Info } from 'lucide-react';

interface CigaretteEquivalentProps {
    aqi: number;
}

export default function CigaretteEquivalent({ aqi }: CigaretteEquivalentProps) {
    // Calculate cigarette equivalent
    // Research shows: AQI of 22 ≈ 1 cigarette per day
    // Formula: cigarettes = AQI / 22
    const cigarettesPerDay = (aqi / 22).toFixed(1);
    const cigarettesPerMonth = ((aqi / 22) * 30).toFixed(0);
    const cigarettesPerYear = ((aqi / 22) * 365).toFixed(0);

    // Determine severity level
    const getSeverityLevel = (aqi: number) => {
        if (aqi <= 50) return { level: 'Low', color: '#2ECC71', bgColor: 'from-green-50 to-emerald-50', borderColor: 'border-green-200' };
        if (aqi <= 100) return { level: 'Moderate', color: '#F1C40F', bgColor: 'from-yellow-50 to-amber-50', borderColor: 'border-yellow-200' };
        if (aqi <= 150) return { level: 'High', color: '#E67E22', bgColor: 'from-orange-50 to-red-50', borderColor: 'border-orange-200' };
        if (aqi <= 200) return { level: 'Very High', color: '#E74C3C', bgColor: 'from-red-50 to-rose-50', borderColor: 'border-red-300' };
        return { level: 'Severe', color: '#7E0023', bgColor: 'from-red-100 to-rose-100', borderColor: 'border-red-400' };
    };

    const severity = getSeverityLevel(aqi);

    return (
        <div className={`bg-gradient-to-br ${severity.bgColor} rounded-3xl shadow-xl border-2 ${severity.borderColor} overflow-hidden`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500 p-3 rounded-xl">
                            <Cigarette className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Cigarette Equivalent</h2>
                            <p className="text-gray-300 text-sm">Air pollution exposure comparison</p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Info className="w-4 h-4 text-white" />
                            <span className="text-white text-sm">Based on AQI: {aqi}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Warning Banner */}
                {parseFloat(cigarettesPerDay) > 2 && (
                    <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-800 font-semibold text-sm">High Exposure Warning</p>
                            <p className="text-red-700 text-sm">
                                Breathing this air is equivalent to smoking {cigarettesPerDay} cigarettes daily. Consider using air purifiers and masks.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Animated Cigarette Visualization */}
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-8 shadow-lg">
                        <div className="relative mb-6">
                            {/* Cigarette SVG with Animation */}
                            <svg width="300" height="120" viewBox="0 0 300 120" className="drop-shadow-lg">
                                {/* Cigarette Body */}
                                <rect x="50" y="50" width="200" height="30" rx="15" fill="#f5f5f5" stroke="#d1d5db" strokeWidth="2"/>
                                
                                {/* Cigarette Paper Texture */}
                                <line x1="70" y1="50" x2="70" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="90" y1="50" x2="90" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="110" y1="50" x2="110" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="130" y1="50" x2="130" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="150" y1="50" x2="150" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="170" y1="50" x2="170" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="190" y1="50" x2="190" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="210" y1="50" x2="210" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                <line x1="230" y1="50" x2="230" y2="80" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                                
                                {/* Filter (Orange part) */}
                                <rect x="50" y="50" width="40" height="30" rx="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                                
                                {/* Filter Pattern */}
                                <line x1="60" y1="50" x2="60" y2="80" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
                                <line x1="70" y1="50" x2="70" y2="80" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
                                <line x1="80" y1="50" x2="80" y2="80" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
                                
                                {/* Burning End */}
                                <ellipse cx="250" cy="65" rx="8" ry="15" fill="#dc2626">
                                    <animate attributeName="fill" values="#dc2626;#ef4444;#dc2626" dur="1s" repeatCount="indefinite"/>
                                </ellipse>
                                
                                {/* Ash */}
                                <ellipse cx="258" cy="65" rx="4" ry="12" fill="#6b7280">
                                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite"/>
                                </ellipse>
                                
                                {/* Smoke Particles */}
                                <g className="smoke">
                                    {/* Smoke 1 */}
                                    <circle cx="265" cy="65" r="3" fill="#9ca3af" opacity="0.6">
                                        <animate attributeName="cx" from="265" to="280" dur="2s" repeatCount="indefinite"/>
                                        <animate attributeName="cy" from="65" to="30" dur="2s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
                                        <animate attributeName="r" from="3" to="8" dur="2s" repeatCount="indefinite"/>
                                    </circle>
                                    
                                    {/* Smoke 2 */}
                                    <circle cx="265" cy="65" r="3" fill="#9ca3af" opacity="0.5">
                                        <animate attributeName="cx" from="265" to="285" dur="2.5s" repeatCount="indefinite"/>
                                        <animate attributeName="cy" from="65" to="25" dur="2.5s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite"/>
                                        <animate attributeName="r" from="3" to="10" dur="2.5s" repeatCount="indefinite"/>
                                    </circle>
                                    
                                    {/* Smoke 3 */}
                                    <circle cx="265" cy="65" r="2" fill="#9ca3af" opacity="0.4">
                                        <animate attributeName="cx" from="265" to="275" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="cy" from="65" to="20" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="r" from="2" to="12" dur="3s" repeatCount="indefinite"/>
                                    </circle>
                                    
                                    {/* Smoke 4 */}
                                    <circle cx="265" cy="65" r="2" fill="#9ca3af" opacity="0.3">
                                        <animate attributeName="cx" from="265" to="290" dur="3.5s" repeatCount="indefinite"/>
                                        <animate attributeName="cy" from="65" to="15" dur="3.5s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="0.3" to="0" dur="3.5s" repeatCount="indefinite"/>
                                        <animate attributeName="r" from="2" to="14" dur="3.5s" repeatCount="indefinite"/>
                                    </circle>
                                </g>
                                
                                {/* Ember Glow */}
                                <ellipse cx="250" cy="65" rx="12" ry="18" fill="#ef4444" opacity="0.3">
                                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1s" repeatCount="indefinite"/>
                                </ellipse>
                            </svg>
                        </div>

                        {/* Main Number */}
                        <div className="text-center mb-4">
                            <div className="text-6xl font-bold mb-2" style={{ color: severity.color }}>
                                {cigarettesPerDay}
                            </div>
                            <p className="text-xl font-semibold text-gray-700">Cigarettes per Day</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Equivalent air pollution exposure
                            </p>
                        </div>

                        {/* Severity Badge */}
                        <div 
                            className="px-6 py-2 rounded-full font-bold text-white text-sm"
                            style={{ backgroundColor: severity.color }}
                        >
                            {severity.level} Exposure
                        </div>
                    </div>

                    {/* Right: Statistics and Information */}
                    <div className="space-y-6">
                        {/* Time-based Statistics */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Cigarette className="w-5 h-5 text-red-500" />
                                Exposure Over Time
                            </h3>
                            <div className="space-y-4">
                                {/* Daily */}
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Daily Exposure</p>
                                        <p className="text-xs text-gray-500">24 hours of breathing</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-900">{cigarettesPerDay}</p>
                                        <p className="text-xs text-gray-500">cigarettes</p>
                                    </div>
                                </div>

                                {/* Monthly */}
                                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                                    <div>
                                        <p className="text-sm text-orange-800 font-medium">Monthly Exposure</p>
                                        <p className="text-xs text-orange-600">30 days of breathing</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-orange-900">{cigarettesPerMonth}</p>
                                        <p className="text-xs text-orange-600">cigarettes</p>
                                    </div>
                                </div>

                                {/* Yearly */}
                                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-200">
                                    <div>
                                        <p className="text-sm text-red-800 font-medium">Yearly Exposure</p>
                                        <p className="text-xs text-red-600">365 days of breathing</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-red-900">{cigarettesPerYear}</p>
                                        <p className="text-xs text-red-600">cigarettes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Information Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                                <Info className="w-5 h-5" />
                                How is this calculated?
                            </h4>
                            <p className="text-sm text-blue-800 leading-relaxed mb-3">
                                Research shows that breathing air with an AQI of 22 for 24 hours is equivalent to smoking one cigarette. 
                                This calculation helps visualize the health impact of air pollution.
                            </p>
                            <div className="bg-white/50 rounded-lg p-3 text-xs text-blue-700 font-mono">
                                Formula: Cigarettes = AQI ÷ 22
                            </div>
                        </div>

                        {/* Health Impact */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                            <h4 className="font-bold text-purple-900 mb-3">Health Impact</h4>
                            <ul className="space-y-2 text-sm text-purple-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>Increased risk of respiratory diseases</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>Cardiovascular stress and complications</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>Reduced lung function over time</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>Higher susceptibility to infections</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Tips */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Protection Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                            <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-green-900 text-sm">Use Air Purifiers</p>
                                <p className="text-xs text-green-700 mt-1">HEPA filters remove 99.97% of particles</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="bg-blue-500 p-2 rounded-lg flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-900 text-sm">Wear N95 Masks</p>
                                <p className="text-xs text-blue-700 mt-1">Especially during high pollution days</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="bg-purple-500 p-2 rounded-lg flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-purple-900 text-sm">Stay Indoors</p>
                                <p className="text-xs text-purple-700 mt-1">Limit outdoor activities when AQI is high</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
