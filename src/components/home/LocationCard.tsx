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
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between" style={{ height: '165px' }}>
            <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin size={20} />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Sensor Location</h3>
                    <p className="text-xs text-gray-500">Fixed Monitor Station</p>
                </div>
            </div>

            <div className="space-y-2 flex-1 overflow-hidden">
                {loading ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ) : location ? (
                    <>
                        <div className="pb-2 border-b border-gray-50">
                            <div className="text-lg font-bold text-gray-800 leading-tight truncate">
                                {location.address}
                            </div>
                            <div className="text-sm text-gray-600 mt-0.5 truncate">
                                {location.city}, {location.state}
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-2">
                            {location.formatted}
                        </div>
                    </>
                ) : (
                    <div className="pb-2">
                        <div className="text-lg font-bold text-gray-800 leading-tight">
                            Loading location...
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">
                            Please wait
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center pt-2">
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
