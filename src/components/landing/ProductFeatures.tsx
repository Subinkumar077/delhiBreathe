import { Zap, Leaf, Shield, BarChart3, Wind, Smartphone } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Solar Powered',
        description: 'Runs entirely on solar energy with battery backup. Zero electricity bills, maximum sustainability.',
        colorClass: 'bg-yellow-100 text-yellow-600'
    },
    {
        icon: Leaf,
        title: 'Eco-Friendly Design',
        description: 'Built with MDF board and sustainable materials. Clean air without harming the environment.',
        colorClass: 'bg-green-100 text-green-600'
    },
    {
        icon: Shield,
        title: '3-Layer Filtration',
        description: 'HEPA filter, activated carbon filter, and pre-filter working together for maximum purification.',
        colorClass: 'bg-blue-100 text-blue-600'
    },
    {
        icon: BarChart3,
        title: 'Real-Time Monitoring',
        description: 'Track PM2.5, PM10, CO, NO2, and NH3 levels with IoT-enabled sensors and live dashboard.',
        colorClass: 'bg-purple-100 text-purple-600'
    },
    {
        icon: Wind,
        title: 'AI Predictions',
        description: 'LSTM neural network predicts air quality trends to help you plan ahead and stay protected.',
        colorClass: 'bg-indigo-100 text-indigo-600'
    },
    {
        icon: Smartphone,
        title: 'Mobile App',
        description: 'Monitor air quality on the go with our Android app. Get alerts and health recommendations.',
        colorClass: 'bg-red-100 text-red-600'
    }
];

export default function ProductFeatures() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div 
                        key={index}
                        className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className={`w-14 h-14 ${feature.colorClass} rounded-lg flex items-center justify-center mb-6`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
