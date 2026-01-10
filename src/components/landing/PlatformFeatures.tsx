import { CheckCircle2 } from 'lucide-react';

const platformFeatures = [
    {
        title: 'Live Dashboard',
        description: 'Monitor current AQI, pollutant levels, and health recommendations in real-time.',
        items: [
            'Color-coded AQI scale',
            'Individual pollutant tracking',
            'Health impact indicators'
        ]
    },
    {
        title: 'Multi-City Comparison',
        description: 'Compare air quality trends across different cities with interactive charts.',
        items: [
            '24-hour trend analysis',
            'City rankings',
            'Historical data access'
        ]
    },
    {
        title: 'Interactive Map',
        description: 'Visualize sensor locations and air quality hotspots on an interactive map.',
        items: [
            'Geolocation-based data',
            'Clustered sensor readings',
            'Real-time updates'
        ]
    },
    {
        title: 'AI Chatbot Assistant',
        description: 'Get instant answers about air quality with voice and text-enabled AI assistant.',
        items: [
            'Voice input capability',
            'Health recommendations',
            '25+ FAQs answered'
        ]
    }
];

export default function PlatformFeatures() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Monitoring Platform
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Access real-time air quality data from anywhere with our comprehensive web dashboard
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {platformFeatures.map((feature, index) => (
                        <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 mb-4">
                                {feature.description}
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                {feature.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
