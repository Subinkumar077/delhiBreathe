import { useState, useMemo } from 'react';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { useLocationName } from '../hooks/useLocationName';
import SearchBar from '../components/map/SearchBar';
import MapMarker from '../components/map/MapMarker';
import MapControls from '../components/map/MapControls';
import MapLegend from '../components/map/MapLegend';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { CITIES } from '../data/mockCityData';
import type { SensorReading } from '../types/sensor';
import 'leaflet/dist/leaflet.css';

const MapContent = () => {
    const { data, loading, error } = useFirebaseData();
    const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');

    // Only fetch location if we have valid data
    const hasValidData = data && data.lat && data.lon;
    const { location } = useLocationName(hasValidData ? data.lat : 0, hasValidData ? data.lon : 0);

    // Generate mock sensor data for all cities
    const citySensorData = useMemo(() => {
        const now = Date.now();
        return Object.entries(CITIES).map(([key, city]) => {
            // Generate realistic AQI with some variation
            const baseAQI = city.baseAQI;
            const variation = Math.random() * 40 - 20; // ±20 variation
            const currentAQI = Math.round(Math.max(0, Math.min(500, baseAQI + variation)));
            
            // Generate PM values based on AQI
            const pm25 = Math.round(currentAQI * 0.5 + Math.random() * 20);
            const pm10 = Math.round(currentAQI * 0.8 + Math.random() * 30);
            
            const sensorData: SensorReading = {
                aqi: currentAQI,
                aqiCategory: currentAQI <= 50 ? 'Good' : currentAQI <= 100 ? 'Moderate' : currentAQI <= 150 ? 'Poor' : currentAQI <= 200 ? 'Unhealthy' : currentAQI <= 300 ? 'Severe' : 'Hazardous',
                pm25,
                pm10,
                lat: city.coordinates.lat,
                lon: city.coordinates.lon,
                timestamp: now,
                sats: 8,
                gas1_ppm: 0,
                gas2_ppm: 0,
                gas3_ppm: 0
            };
            
            return {
                key,
                city,
                data: sensorData,
                location: `${city.area}, ${city.name}, ${city.state}`
            };
        });
    }, []);

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

    // Default center (India center view to show all cities)
    const defaultCenter: [number, number] = [22.5, 78.9];
    const center: [number, number] = isValidCoord ? [lat, lon] : defaultCenter;

    // Map tile configurations
    const tileConfigs = {
        street: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: ''
        },
        satellite: {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: ''
        }
    };

    const currentTileConfig = tileConfigs[mapLayer];

    try {
        return (
            <div className="w-full relative map-container-height -mt-4 sm:mt-0">
                <LeafletMap
                    center={center}
                    zoom={isValidCoord ? 13 : 5}
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

                    {/* Live sensor marker (Pune) */}
                    {data && isValidCoord && (
                        <MapMarker
                            data={data}
                            location={location?.formatted || 'Live Sensor Location'}
                            isCurrentSensor={true}
                        />
                    )}

                    {/* Mock city markers */}
                    {citySensorData.map(({ key, data: cityData, location: cityLocation }) => (
                        <MapMarker
                            key={key}
                            data={cityData}
                            location={cityLocation}
                            isCurrentSensor={false}
                        />
                    ))}
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
