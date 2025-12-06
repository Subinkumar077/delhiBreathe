import { Popup } from 'react-leaflet';
import type { SensorReading } from '../../types/sensor';
import { formatTimestamp } from '../../utils/formatters';
import { getAqiColor } from '../../utils/aqiColors';

interface MarkerPopupProps {
    data: SensorReading;
}

export default function MarkerPopup({ data }: MarkerPopupProps) {
    return (
        <Popup className="aqi-popup">
            <div className="p-1 min-w-[200px]">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-gray-900">AQI Station</h3>
                        <p className="text-xs text-gray-500">{formatTimestamp(data.timestamp)}</p>
                    </div>
                    <span
                        className="px-2 py-1 rounded text-xs font-bold text-white shadow-sm"
                        style={{ backgroundColor: getAqiColor(data.aqi) }}
                    >
                        {data.aqi}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">PM2.5</div>
                        <div className="font-semibold">{data.pm25}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">PM10</div>
                        <div className="font-semibold">{data.pm10}</div>
                    </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs">
                    <span className="text-gray-500">CO: {data.gas1_ppm}</span>
                    <span className="text-gray-500">NO2: {data.gas2_ppm}</span>
                </div>
            </div>
        </Popup>
    );
}
