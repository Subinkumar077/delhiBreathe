import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapReadings } from '../../hooks/useMapReadings';
import MapMarker from './MapMarker';
import SearchBar from './SearchBar';
import LoadingSpinner from '../shared/LoadingSpinner';

const DELHI_CENTER: [number, number] = [28.6139, 77.2090];

export default function MapWrapper() {
    const { readings, loading } = useMapReadings();

    if (loading) return <LoadingSpinner />;

    return (
        <div className="h-[calc(100vh-64px)] w-full relative z-0">
            <MapContainer
                center={DELHI_CENTER}
                zoom={11}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />

                {/* Search Bar Overlay */}
                <SearchBar />

                {/* Markers */}
                {readings.map((reading, index) => (
                    <MapMarker
                        key={`${reading.lat}-${reading.lon}-${index}`}
                        data={reading}
                    />
                ))}
            </MapContainer>
        </div>
    );
}
