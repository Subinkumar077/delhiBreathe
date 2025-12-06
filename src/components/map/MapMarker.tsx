import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getAqiColor, getAqiCategory } from '../../utils/aqiColors';
import { formatRelativeTime } from '../../utils/formatters';

interface MapMarkerProps {
    position: [number, number];
    aqi: number;
    location?: string;
    pm25: number;
    pm10: number;
    timestamp: number;
    isCurrentSensor?: boolean;
}

const customIcon = (aqi: number, isLive: boolean = false) => {
    const color = getAqiColor(aqi);

    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div class="${isLive ? 'animate-pulse' : ''}" style="
        background: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">
        ${aqi}
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
};

export default function MapMarker({
    position,
    aqi,
    location,
    pm25,
    pm10,
    timestamp,
    isCurrentSensor
}: MapMarkerProps) {
    const color = getAqiColor(aqi);
    const category = getAqiCategory(aqi);

    return (
        <Marker
            position={position}
            icon={customIcon(aqi, isCurrentSensor)}
        >
            <Popup closeButton={false} offset={[0, -10]}>
                <div className="p-2 min-w-[200px]">
                    {/* Location name instead of coordinates */}
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{location || 'Sensor Location'}</h3>

                    {/* AQI display */}
                    <div
                        className="text-center p-3 rounded-lg mb-3 shadow-sm"
                        style={{ backgroundColor: color, color: 'white' }}
                    >
                        <div className="text-3xl font-bold">{aqi}</div>
                        <div className="text-sm font-medium opacity-90">{category}</div>
                    </div>

                    {/* Pollutant details */}
                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between items-center text-gray-700">
                            <span className="text-gray-500">PM2.5</span>
                            <span className="font-semibold">{pm25} µg/m³</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-700">
                            <span className="text-gray-500">PM10</span>
                            <span className="font-semibold">{pm10} µg/m³</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-2 text-right pt-2 border-t border-gray-100">
                            Updated {formatRelativeTime(timestamp)}
                        </div>
                    </div>

                    {isCurrentSensor && (
                        <div className="mt-3 text-xs bg-green-50 text-green-700 font-semibold px-2 py-1.5 rounded-md text-center border border-green-100 flex items-center justify-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Sensor Feed
                        </div>
                    )}
                </div>
            </Popup>
        </Marker>
    );
}
