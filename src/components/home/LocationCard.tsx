import { MapPin, Satellite } from 'lucide-react';
import { useLocationName } from '../../hooks/useLocationName';

interface LocationCardProps {
    lat: number;
    lon: number;
    sats: number;
}

export default function LocationCard({ lat, lon, sats }: LocationCardProps) {
    const { location, loading } = useLocationName(lat, lon);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin size={24} />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Sensor Location</h3>
                    <p className="text-sm text-gray-500">Fixed Monitor Station</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ) : (
                    <>
                        <div className="py-2 border-b border-gray-50">
                            <div className="text-2xl font-bold text-gray-800 leading-tight">
                                {location?.address || 'Unknown Location'}
                            </div>
                            <div className="text-lg text-gray-600 mt-1">
                                {location?.city}, {location?.state}
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {location?.formatted}
                        </div>
                    </>
                )}

                <div className="flex justify-between items-center py-2 pt-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Satellite size={16} />
                        <span>Satellites</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 h-3 rounded-full ${i < Math.min(sats, 5) ? 'bg-green-500' : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-gray-700">{sats}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
