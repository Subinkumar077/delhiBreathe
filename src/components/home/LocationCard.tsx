import { MapPin, Radio } from 'lucide-react';

interface LocationCardProps {
    lat?: number;
    lon?: number;
    sats?: number;
}

export default function LocationCard({}: LocationCardProps) {
    return (
        <div 
            className="relative overflow-hidden rounded-3xl p-6 shadow-sm border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col justify-between"
            style={{ height: '320px' }}
        >
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                <MapPin size={180} strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">Sensor Location</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Fixed Monitor Station</p>
                        </div>
                    </div>
                </div>

                {/* Location Details */}
                <div className="space-y-3 my-4">
                    <div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                            Solapur Road
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                            Loni Kalbhor, Maharashtra, 412200, India
                        </div>
                    </div>

                    {/* Coordinates & Status */}
                    {/* <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Navigation size={14} className="text-blue-600" />
                                <span className="text-xs font-semibold text-gray-600">Coordinates</span>
                            </div>
                            <div className="text-xs font-mono text-gray-900">
                                {lat?.toFixed(4) || '18.5204'}°N
                            </div>
                            <div className="text-xs font-mono text-gray-900">
                                {lon?.toFixed(4) || '73.8567'}°E
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Satellite size={14} className="text-green-600" />
                                <span className="text-xs font-semibold text-gray-600">GPS Status</span>
                            </div>
                            <div className="text-xs text-gray-900 font-semibold">
                                {sats || 12} Satellites
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                                Active
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Station Info */}
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-3 text-white">
                    <div className="flex items-center gap-2 mb-1">
                        <Radio size={16} />
                        <span className="text-xs font-semibold">Station Information</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                        Real-time air quality monitoring station providing continuous environmental data for public health and safety.
                    </p>
                </div>
            </div>
        </div>
    );
}
