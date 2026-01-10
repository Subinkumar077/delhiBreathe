import { Shield, Wind, Gauge, Cpu, MapPin } from 'lucide-react';

const specifications = [
    {
        icon: Shield,
        title: 'Pre-Filter Stage',
        description: 'Captures hair, dust, and large particles before they reach primary filters',
        color: 'bg-blue-100 text-blue-600'
    },
    {
        icon: Shield,
        title: 'True HEPA H13',
        description: 'Removes 99.97% of particles down to 0.3 micrometres including allergens and bacteria',
        color: 'bg-green-100 text-green-600'
    },
    {
        icon: Wind,
        title: 'Anti-Bacterial Filter',
        description: '600 grams of premium Anti-Bacterial eliminate gases, odours, and volatile compounds',
        color: 'bg-purple-100 text-purple-600'
    },
    {
        icon: Gauge,
        title: 'Dual Fan System',
        description: 'Two 120 mm fans deliver 240 m³/h CADR for rapid room purification',
        color: 'bg-orange-100 text-orange-600'
    },
    {
        icon: Cpu,
        title: 'Smart Monitoring',
        description: 'PMS7003MT + MiCS-6814 sensors provide accurate multi-pollutant real-time tracking',
        color: 'bg-indigo-100 text-indigo-600'
    },
    {
        icon: MapPin,
        title: 'GPS Tracking',
        description: 'Neo 6M GPS sensor for precise geolocation and sensor network mapping',
        color: 'bg-red-100 text-red-600'
    }
];

export default function TechnicalSpecs() {
    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Technical Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specifications.map((spec, index) => {
                    const Icon = spec.icon;
                    return (
                        <div 
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className={`w-12 h-12 ${spec.color} rounded-lg flex items-center justify-center mb-4`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {spec.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {spec.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Key Performance Metrics */}
            <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">Key Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">99.97%</div>
                        <div className="text-sm text-green-100">Filtration Efficiency</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">240</div>
                        <div className="text-sm text-green-100">m³/h CADR</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">0.3</div>
                        <div className="text-sm text-green-100">µm Particle Size</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">5</div>
                        <div className="text-sm text-green-100">Pollutants Tracked</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
