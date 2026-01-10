import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product/ProductCard';

const specs = [
    {
        title: 'Solar Panel + Battery',
        description: 'Continuous operation without grid power'
    },
    {
        title: 'Multi-Sensor Array',
        description: 'PM2.5, PM10, CO, NO2, NH3 detection'
    },
    {
        title: 'High CFM Fans',
        description: 'Powerful air circulation for effective purification'
    },
    {
        title: 'LCD Display',
        description: 'Real-time AQI readings at a glance'
    }
];

export default function ProductSpecs() {
    const navigate = useNavigate();

    const handlePreOrder = () => {
        navigate('/checkout');
    };

    return (
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-3xl font-bold mb-6">Eco Breathe Device</h3>
                    <p className="text-lg mb-8 text-green-50">
                        A complete air purification and monitoring system designed for Indian conditions.
                    </p>
                    
                    <div className="space-y-4">
                        {specs.map((spec, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <div className="font-semibold">{spec.title}</div>
                                    <div className="text-sm text-green-50">{spec.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <ProductCard onPreOrder={handlePreOrder} />
            </div>
        </div>
    );
}
