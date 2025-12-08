import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getAqiColor, getAqiCategory } from '../../utils/aqiColors';
import { formatRelativeTime } from '../../utils/formatters';
import type { SensorReading } from '../../types/sensor';

interface MapMarkerProps {
    data: SensorReading;
    location?: string;
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
    data,
    location,
    isCurrentSensor
}: MapMarkerProps) {
    const { aqi, pm25, pm10, timestamp, lat, lon } = data;
    const color = getAqiColor(aqi);
    const category = getAqiCategory(aqi);

    return (
        <Marker
            position={[lat, lon]}
            icon={customIcon(aqi, isCurrentSensor)}
        >
            <Popup
                closeButton={true}
                offset={[0, -10]}
                className="custom-popup"
            >
                <div className="p-3 min-w-[220px]">
                    {/* Location name */}
                    <h3 className="font-bold text-base mb-3 text-gray-900 pr-4">{location || 'Sensor Location'}</h3>

                    {/* AQI display with enhanced styling */}
                    <div
                        className="text-center p-4 rounded-xl mb-3 shadow-md"
                        style={{
                            backgroundColor: color,
                            color: 'white',
                            boxShadow: `0 4px 12px ${color}40`
                        }}
                    >
                        <div className="text-4xl font-bold mb-1">{aqi}</div>
                        <div className="text-sm font-semibold opacity-95 uppercase tracking-wide">{category}</div>
                    </div>

                    {/* Pollutant details with better spacing */}
                    <div className="space-y-2 text-sm bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">PM2.5</span>
                            <span className="font-bold text-gray-900">{pm25} <span className="text-xs text-gray-500">µg/m³</span></span>
                        </div>
                        <div className="h-px bg-gray-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">PM10</span>
                            <span className="font-bold text-gray-900">{pm10} <span className="text-xs text-gray-500">µg/m³</span></span>
                        </div>
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-gray-500 text-center mb-2">
                        Updated {formatRelativeTime(timestamp)}
                    </div>

                    {/* Live indicator */}
                    {isCurrentSensor && (
                        <div className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold px-3 py-2 rounded-lg text-center border border-green-200 flex items-center justify-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>Live Sensor Feed</span>
                        </div>
                    )}
                </div>
            </Popup>
        </Marker>
    );
}
