import { useFirebaseData } from '../hooks/useFirebaseData';
import { useLocationName } from '../hooks/useLocationName';
import SearchBar from '../components/map/SearchBar';
import MapMarker from '../components/map/MapMarker';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapContent = () => {
    const { data, loading, error } = useFirebaseData();
    // We can also fetch the location name for the main sensor here if we want to show it in the marker
    const { location } = useLocationName(data?.lat || 0, data?.lon || 0);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center p-8 text-red-500">Error loading sensor data. Please check connection.</div>;

    // Ensure we have valid numbers for coordinates
    const lat = Number(data?.lat);
    const lon = Number(data?.lon);
    const isValidCoord = !isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0;

    // Default center (New Delhi)
    const defaultCenter: [number, number] = [28.6139, 77.2090];
    const center: [number, number] = isValidCoord ? [lat, lon] : defaultCenter;

    return (
        <div className="w-full relative map-container-height -mt-4 sm:mt-0">
            {/* Search bar overlay */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto z-[1000] w-auto sm:w-80 shadow-lg rounded-xl">
                <SearchBar />
            </div>

            <LeafletMap
                center={center}
                zoom={13}
                className="w-full h-full z-0 outline-none"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {data && isValidCoord && (
                    <MapMarker
                        position={[lat, lon]}
                        aqi={data.aqi}
                        location={location?.formatted || 'Live Sensor Location'}
                        pm25={data.pm25}
                        pm10={data.pm10}
                        timestamp={data.timestamp}
                        isCurrentSensor={true}
                    />
                )}
            </LeafletMap>
        </div>
    );
};

export default function AirPollutionMap() {
    return (
        <ErrorBoundary>
            <MapContent />
        </ErrorBoundary>
    );
}
