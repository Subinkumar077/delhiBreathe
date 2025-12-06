import { useFirebaseData } from '../hooks/useFirebaseData';
import AQIHero from '../components/home/AQIHero';
import AQIScale from '../components/home/AQIScale';
import PollutantCard from '../components/home/PollutantCard';
import LocationCard from '../components/home/LocationCard';
import LiveStatus from '../components/home/LiveStatus';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import { Wind, CloudFog, Flame, Pipette, Droplets } from 'lucide-react';

export default function Home() {
    const { data, loading, error, connected } = useFirebaseData();

    if (loading) return <LoadingSpinner />;
    if (error || !data) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700">Unable to load data</h2>
            <p className="text-gray-500">Please check your connection or database configuration.</p>
        </div>
    );

    return (
        <ErrorBoundary>
            <div className="space-y-6 animate-fade-in">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">Real-time environmental monitoring</p>
                    </div>
                    <LiveStatus connected={connected} lastUpdate={data.timestamp} />
                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AQIHero data={data} />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <LocationCard lat={data.lat} lon={data.lon} sats={data.sats} />
                    </div>
                </div>

                {/* Scale Section */}
                <AQIScale currentAqi={data.aqi} />

                {/* Pollutants Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    <PollutantCard
                        label="PM2.5"
                        value={data.pm25}
                        unit="µg/m³"
                        icon={Wind}
                        colorClass="bg-purple-500"
                    />
                    <PollutantCard
                        label="PM10"
                        value={data.pm10}
                        unit="µg/m³"
                        icon={CloudFog}
                        colorClass="bg-blue-500"
                    />
                    <PollutantCard
                        label="CO"
                        value={data.gas1_ppm}
                        unit="ppm"
                        icon={Flame}
                        colorClass="bg-red-500"
                    />
                    <PollutantCard
                        label="NO2"
                        value={data.gas2_ppm}
                        unit="ppm"
                        icon={Pipette} // Using Pipette as generic chemical icon substitute
                        colorClass="bg-orange-500"
                    />
                    <PollutantCard
                        label="NH3"
                        value={data.gas3_ppm}
                        unit="ppm"
                        icon={Droplets}
                        colorClass="bg-teal-500"
                    />
                </div>
            </div>
        </ErrorBoundary>
    );
}
