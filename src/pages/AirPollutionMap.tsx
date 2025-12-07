import { useState } from 'react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { useLocationName } from '../hooks/useLocationName';
import SearchBar from '../components/map/SearchBar';
import MapMarker from '../components/map/MapMarker';
import MapControls from '../components/map/MapControls';
import MapLegend from '../components/map/MapLegend';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapContent = () => {
    const { data, loading, error } = useFirebaseData();
    const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');
    
    // Only fetch location if we have valid data
    const hasValidData = data && data.lat && data.lon;
    const { location } = useLocationName(hasValidData ? data.lat : 0, hasValidData ? data.lon : 0);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center p-8 text-red-500">Error loading sensor data. Please check connection.</div>;
    
    // If no data at all, show a message
    if (!data) {
        return <div className="text-center p-8 text-gray-500">No sensor data available. Waiting for data...</div>;
    }

    // Ensure we have valid numbers for coordinates
    const lat = Number(data.lat);
    const lon = Number(data.lon);
    
    // Validate coordinates: must be valid numbers, not 0, and within valid lat/lon ranges
    const isValidCoord = !isNaN(lat) && !isNaN(lon) && 
                         lat !== 0 && lon !== 0 &&
                         lat >= -90 && lat <= 90 &&
                         lon >= -180 && lon <= 180;

    // Default center (New Delhi)
    const defaultCenter: [number, number] = [28.6139, 77.2090];
    const center: [number, number] = isValidCoord ? [lat, lon] : defaultCenter;

    // Map tile configurations
    const tileConfigs = {
        street: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        satellite: {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
        }
    };

    const currentTileConfig = tileConfigs[mapLayer];

    try {
        return (
            <div className="w-full relative map-container-height -mt-4 sm:mt-0">
                <LeafletMap
                    center={center}
                    zoom={13}
                    className="w-full h-full z-0 outline-none"
                    scrollWheelZoom={true}
                    zoomControl={false}
                    key={`${center[0]}-${center[1]}`}
                >
                    <TileLayer
                        attribution={currentTileConfig.attribution}
                        url={currentTileConfig.url}
                        key={mapLayer}
                    />

                    {/* Search bar must be inside MapContainer to use useMap hook */}
                    <SearchBar />

                    {/* Map Controls */}
                    <MapControls 
                        onLayerChange={setMapLayer}
                        currentLayer={mapLayer}
                    />

                    {/* AQI Legend */}
                    <MapLegend />

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
    } catch (err) {
        console.error('Map rendering error:', err);
        return <div className="text-center p-8 text-red-500">Error rendering map. Please refresh the page.</div>;
    }
};

export default function AirPollutionMap() {
    return (
        <ErrorBoundary>
            <MapContent />
        </ErrorBoundary>
    );
}
