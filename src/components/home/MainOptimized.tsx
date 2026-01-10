/**
 * ============================================
 * OPTIMIZED MOBILE DASHBOARD COMPONENT
 * ============================================
 * 
 * Mobile-optimized version with:
 * - Collapsible sections for better UX
 * - Lazy loading for performance
 * - Progressive disclosure
 * - Touch-friendly interactions
 * 
 * ============================================
 */

import { useState } from 'react';
import AQIHero from './AQIHero';
import AQIScale from './AQIScale';
import AQIDataViewer from './AQIDataViewer';
import AQIPredictionCard from './AQIPredictionCard';
import PollutantTabs from './PollutantTabs';
import PollutantCard from './PollutantCard';
import LocationCard from './LocationCard';
import LiveStatus from './LiveStatus';
import FilterMaintenanceCard from './FilterMaintenanceCard';
import CigaretteEquivalent from './CigaretteEquivalent';
import DataAttribution from '../shared/DataAttribution';
import CollapsibleSection from '../shared/CollapsibleSection';
import LazySection from '../shared/LazySection';
import { Wind, CloudFog, Flame, Pipette, Droplets, Wrench, Info } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { SensorReading } from '../../types/sensor';
import { CITIES } from '../../data/mockCityData';

interface HomeMainProps {
    data: SensorReading;
    connected: boolean;
}

export default function MainOptimized({ data, connected }: HomeMainProps) {
    const [selectedCity, setSelectedCity] = useState<'pune' | 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'hyderabad' | 'ahmedabad' | 'lucknow'>('pune');
    const isMobile = useIsMobile();

    const handleCityChange = (city: 'pune' | 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'hyderabad' | 'ahmedabad' | 'lucknow') => {
        setSelectedCity(city);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header - Always visible */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Real-time environmental monitoring</p>
                </div>
                <LiveStatus connected={connected} lastUpdate={data.timestamp} />
            </div>

            {/* AQI Hero + Location - Always visible, critical info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AQIHero data={data} />
                </div>
                <div className="lg:col-span-1">
                    <LocationCard 
                        lat={selectedCity === 'pune' ? data.lat : CITIES[selectedCity].coordinates.lat} 
                        lon={selectedCity === 'pune' ? data.lon : CITIES[selectedCity].coordinates.lon} 
                        sats={data.sats}
                    />
                </div>
            </div>

            {/* AQI Scale - Always visible on desktop, collapsible on mobile */}
            {isMobile ? (
                <CollapsibleSection 
                    title="AQI Scale Reference" 
                    defaultOpen={false}
                    icon={<Info className="w-5 h-5" />}
                >
                    <AQIScale currentAqi={data.aqi} />
                </CollapsibleSection>
            ) : (
                <AQIScale currentAqi={data.aqi} />
            )}

            {/* Major Air Pollutants - Collapsible on mobile */}
            {isMobile ? (
                <CollapsibleSection 
                    title="Major Air Pollutants" 
                    defaultOpen={true}
                    icon={<Wind className="w-5 h-5" />}
                    badge={5}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <PollutantCard
                            label="PM2.5"
                            value={data.pm25}
                            unit="µg/m³"
                            icon={Wind}
                            colorClass="bg-purple-500"
                            pollutantId="PM2_5"
                        />
                        <PollutantCard
                            label="PM10"
                            value={data.pm10}
                            unit="µg/m³"
                            icon={CloudFog}
                            colorClass="bg-blue-500"
                            pollutantId="PM10"
                        />
                        <PollutantCard
                            label="CO"
                            value={data.gas1_ppm * 1.145}
                            unit="mg/m³"
                            icon={Flame}
                            colorClass="bg-red-500"
                            pollutantId="CO"
                        />
                        <PollutantCard
                            label="NO2"
                            value={data.gas2_ppm}
                            unit="ppm"
                            icon={Pipette}
                            colorClass="bg-orange-500"
                            pollutantId="NO2"
                        />
                        <PollutantCard
                            label="NH3"
                            value={data.gas3_ppm}
                            unit="ppm"
                            icon={Droplets}
                            colorClass="bg-teal-500"
                            pollutantId="NH3"
                        />
                    </div>
                </CollapsibleSection>
            ) : (
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Major Air Pollutants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        <PollutantCard
                            label="PM2.5"
                            value={data.pm25}
                            unit="µg/m³"
                            icon={Wind}
                            colorClass="bg-purple-500"
                            pollutantId="PM2_5"
                        />
                        <PollutantCard
                            label="PM10"
                            value={data.pm10}
                            unit="µg/m³"
                            icon={CloudFog}
                            colorClass="bg-blue-500"
                            pollutantId="PM10"
                        />
                        <PollutantCard
                            label="CO"
                            value={data.gas1_ppm * 1.145}
                            unit="mg/m³"
                            icon={Flame}
                            colorClass="bg-red-500"
                            pollutantId="CO"
                        />
                        <PollutantCard
                            label="NO2"
                            value={data.gas2_ppm}
                            unit="ppm"
                            icon={Pipette}
                            colorClass="bg-orange-500"
                            pollutantId="NO2"
                        />
                        <PollutantCard
                            label="NH3"
                            value={data.gas3_ppm}
                            unit="ppm"
                            icon={Droplets}
                            colorClass="bg-teal-500"
                            pollutantId="NH3"
                        />
                    </div>
                </div>
            )}

            {/* AI Predictions - Lazy loaded */}
            <LazySection>
                <AQIPredictionCard currentAQI={data.aqi} />
            </LazySection>

            {/* Combined AQI Data Viewer (Historical + Real-Time) - Lazy loaded */}
            <LazySection>
                {isMobile ? (
                    <CollapsibleSection 
                        title="AQI Data & Trends" 
                        defaultOpen={true}
                        icon={<Info className="w-5 h-5" />}
                    >
                        <AQIDataViewer currentAQI={data.aqi} onCityChange={handleCityChange} />
                    </CollapsibleSection>
                ) : (
                    <AQIDataViewer currentAQI={data.aqi} onCityChange={handleCityChange} />
                )}
            </LazySection>

            {/* Filter Maintenance - Collapsible on mobile, lazy loaded */}
            <LazySection>
                {isMobile ? (
                    <CollapsibleSection 
                        title="Filter Maintenance Guide" 
                        defaultOpen={false}
                        icon={<Wrench className="w-5 h-5" />}
                    >
                        <FilterMaintenanceCard />
                    </CollapsibleSection>
                ) : (
                    <FilterMaintenanceCard />
                )}
            </LazySection>

            {/* Pollutant Tabs - Lazy loaded */}
            <LazySection>
                <PollutantTabs data={data} />
            </LazySection>

            {/* Cigarette Equivalent - Lazy loaded */}
            <LazySection>
                <CigaretteEquivalent aqi={data.aqi} />
            </LazySection>

            {/* Data Attribution - Always visible */}
            <DataAttribution />
        </div>
    );
}
