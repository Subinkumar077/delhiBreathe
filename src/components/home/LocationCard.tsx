import { MapPin } from 'lucide-react';

interface LocationCardProps {
    lat?: number;
    lon?: number;
    sats?: number;
}

export default function LocationCard({ lat: _lat, lon: _lon, sats: _sats }: LocationCardProps) {
    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100" style={{ height: '155px' }}>
            <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin size={20} />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Sensor Location</h3>
                    <p className="text-xs text-gray-500">Fixed Monitor Station</p>
                </div>
            </div>

            <div>
                <div className="text-xl font-bold text-gray-900 mb-1">
                    Solapur Road
                </div>
                <div className="text-sm text-gray-600 mb-2">
                    Loni Kalbhor, Maharashtra, 412200, India
                </div>
                <div className="text-xs text-gray-500">
                    Air Quality Monitoring Station
                </div>
            </div>
        </div>
    );
}
