import { X } from 'lucide-react';
import FocusTrap from '../shared/FocusTrap';

interface AQIExplainerProps {
    onClose: () => void;
}

const aqiCategories = [
    {
        range: '0-50',
        category: 'Good',
        color: 'bg-green-500',
        textColor: 'text-green-900',
        bgColor: 'bg-green-50',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        healthAdvice: 'Enjoy outdoor activities!'
    },
    {
        range: '51-100',
        category: 'Moderate',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-900',
        bgColor: 'bg-yellow-50',
        description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
        healthAdvice: 'Sensitive individuals should consider limiting prolonged outdoor exertion.'
    },
    {
        range: '101-150',
        category: 'Unhealthy for Sensitive Groups',
        color: 'bg-orange-500',
        textColor: 'text-orange-900',
        bgColor: 'bg-orange-50',
        description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
        healthAdvice: 'Children, elderly, and people with respiratory conditions should limit outdoor activities.'
    },
    {
        range: '151-200',
        category: 'Unhealthy',
        color: 'bg-red-500',
        textColor: 'text-red-900',
        bgColor: 'bg-red-50',
        description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
        healthAdvice: 'Everyone should limit prolonged outdoor exertion.'
    },
    {
        range: '201-300',
        category: 'Very Unhealthy',
        color: 'bg-purple-500',
        textColor: 'text-purple-900',
        bgColor: 'bg-purple-50',
        description: 'Health alert: The risk of health effects is increased for everyone.',
        healthAdvice: 'Everyone should avoid prolonged outdoor exertion. Sensitive groups should avoid all outdoor activities.'
    },
    {
        range: '301+',
        category: 'Hazardous',
        color: 'bg-red-900',
        textColor: 'text-red-900',
        bgColor: 'bg-red-50',
        description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
        healthAdvice: 'Everyone should avoid all outdoor activities. Stay indoors with air purifiers.'
    }
];

export default function AQIExplainer({ onClose }: AQIExplainerProps) {
    return (
        <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="aqi-explainer-title"
        >
            <FocusTrap active={true}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors"
                        aria-label="Close AQI explainer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <h2 id="aqi-explainer-title" className="text-2xl font-bold mb-2">Understanding Air Quality Index (AQI)</h2>
                    <p className="text-green-100">Learn what AQI means and how it affects your health</p>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="space-y-4">
                        {aqiCategories.map((category, index) => (
                            <div 
                                key={index}
                                className={`${category.bgColor} border-l-4 ${category.color} rounded-lg p-4`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`${category.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                                            {category.range}
                                        </div>
                                        <h3 className={`text-lg font-bold ${category.textColor}`}>
                                            {category.category}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">
                                    {category.description}
                                </p>
                                <div className={`${category.bgColor} border ${category.color} border-opacity-30 rounded-md p-2 mt-2`}>
                                    <p className="text-sm font-medium text-gray-800">
                                        <strong>Health Advice:</strong> {category.healthAdvice}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-bold text-blue-900 mb-2">How is AQI Calculated?</h3>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            AQI is calculated based on five major pollutants: PM2.5, PM10, CO, NO2, and NH3. 
                            Each pollutant is measured and converted to a sub-index using Indian CPCB standards. 
                            The overall AQI is the highest (worst) sub-index among all pollutants.
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            onClick={onClose}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
                </div>
            </FocusTrap>
        </div>
    );
}
