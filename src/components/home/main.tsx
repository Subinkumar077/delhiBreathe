/**
 * ============================================
 * MAIN HOME DASHBOARD COMPONENT
 * ============================================
 * 
 * This component renders all sections of the home page.
 * You can easily enable/disable sections by commenting them out.
 * 
 * USAGE:
 * ------
 * In Home.tsx:
 *   import HomeMain from '../components/home/main';
 *   <HomeMain data={data} connected={connected} />
 * 
 * HOW TO HIDE SECTIONS:
 * ---------------------
 * Simply comment out any section you want to hide:
 * 
 * Example - Hide AQI Scale:
 *   // <div className="flex-none">
 *   //     <AQIScale currentAqi={data.aqi} />
 *   // </div>
 * 
 * Example - Hide entire pollutants section:
 *   // <div>
 *   //     <h2 className="text-xl font-bold text-gray-800 mb-4">Major Air Pollutants</h2>
 *   //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
 *   //         ... all pollutant cards ...
 *   //     </div>
 *   // </div>
 * 
 * Example - Hide specific pollutant card (e.g., NH3):
 *   // <PollutantCard
 *   //     label="NH3"
 *   //     value={data.gas3_ppm}
 *   //     unit="ppm"
 *   //     icon={Droplets}
 *   //     colorClass="bg-teal-500"
 *   //     onClick={() => setSelectedPollutant({ id: 'NH3', value: data.gas3_ppm, unit: 'ppm' })}
 *   // />
 * 
 * SECTIONS AVAILABLE:
 * -------------------
 * 1. Header (Title + Live Status)
 * 2. AQI Hero Card
 * 3. AQI Scale
 * 4. Location Card
 * 5. Filter Life Card
 * 6. Major Air Pollutants (PM2.5, PM10, CO, NO2, NH3)
 * 7. Real-Time AQI Monitor (Stock-market style live graph)
 * 8. AQI Trend Graph
 * 9. Filter Maintenance Guide
 * 10. Pollutant Tabs (Current Pollutants & AQI Scale)
 * 11. Pollutant Detail Modal
 * 
 * ============================================
 */

import { useState } from 'react';
import AQIHero from './AQIHero';
import AQIScale from './AQIScale';
import AQITrendGraph from './AQITrendGraph'; 
import AQIRealtimeMonitor from './AQIRealtimeMonitor';
import AQIPredictionCard from './AQIPredictionCard';
import PollutantTabs from './PollutantTabs';
import PollutantCard from './PollutantCard';
import LocationCard from './LocationCard';
import LiveStatus from './LiveStatus';
import FilterMaintenanceCard from './FilterMaintenanceCard';
import CigaretteEquivalent from './CigaretteEquivalent';
import { Wind, CloudFog, Flame, Pipette, Droplets } from 'lucide-react';
import type { SensorReading } from '../../types/sensor';
import { CITIES } from '../../data/mockCityData';

interface HomeMainProps {
    data: SensorReading;
    connected: boolean;
}

export default function HomeMain({ data, connected }: HomeMainProps) {
    const [selectedCity, setSelectedCity] = useState<'pune' | 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'hyderabad' | 'ahmedabad' | 'lucknow'>('pune');

    const handleCityChange = (city: 'pune' | 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'hyderabad' | 'ahmedabad' | 'lucknow') => {
        setSelectedCity(city);
    };

    return (
        <>
            <div className="space-y-6 animate-fade-in">
                {/* ========================================
                    HEADER SECTION
                    Comment out to hide the header
                ======================================== */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">Real-time environmental monitoring</p>
                    </div>
                    <LiveStatus connected={connected} lastUpdate={data.timestamp} />
                </div>

                {/* ========================================
                    MAIN LAYOUT: AQI HERO + LOCATION CARD
                    Comment out to hide this entire section
                ======================================== */}
                {/* Top Row: AQI Hero + Location Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AQI Hero Card - Takes 2/3 width - Comment out to hide */}
                    <div className="lg:col-span-2">
                        <AQIHero data={data} />
                    </div>

                    {/* Location Card - Takes 1/3 width - Comment out to hide */}
                    <div className="lg:col-span-1">
                        <LocationCard 
                            lat={selectedCity === 'pune' ? data.lat : CITIES[selectedCity].coordinates.lat} 
                            lon={selectedCity === 'pune' ? data.lon : CITIES[selectedCity].coordinates.lon} 
                            sats={data.sats}
                        />
                    </div>
                </div>

                {/* AQI Scale - Full width below - Comment out to hide */}
                <AQIScale currentAqi={data.aqi} />

                {/* ========================================
                    MAJOR AIR POLLUTANTS SECTION
                    Comment out to hide all pollutant cards
                ======================================== */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Major Air Pollutants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {/* PM2.5 Card - Comment out to hide */}
                        <PollutantCard
                            label="PM2.5"
                            value={data.pm25}
                            unit="µg/m³"
                            icon={Wind}
                            colorClass="bg-purple-500"
                            pollutantId="PM2_5"
                        />

                        {/* PM10 Card - Comment out to hide */}
                        <PollutantCard
                            label="PM10"
                            value={data.pm10}
                            unit="µg/m³"
                            icon={CloudFog}
                            colorClass="bg-blue-500"
                            pollutantId="PM10"
                        />

                        {/* CO Card - Comment out to hide */}
                        <PollutantCard
                            label="CO"
                            value={data.gas1_ppm * 1.145}
                            unit="mg/m³"
                            icon={Flame}
                            colorClass="bg-red-500"
                            pollutantId="CO"
                        />

                        {/* NO2 Card - Comment out to hide */}
                        <PollutantCard
                            label="NO2"
                            value={data.gas2_ppm}
                            unit="ppm"
                            icon={Pipette}
                            colorClass="bg-orange-500"
                            pollutantId="NO2"
                        />

                        {/* NH3 Card - Comment out to hide */}
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

                {/* ========================================
                    AI-POWERED AQI PREDICTIONS
                    LSTM Neural Network predictions for daily, weekly, and monthly AQI
                    Comment out to hide the prediction card
                ======================================== */}
                <AQIPredictionCard currentAQI={data.aqi} />

                {/* ========================================
                    REAL-TIME AQI MONITOR
                    Comment out to hide the real-time monitoring graph
                ======================================== */}
                <AQIRealtimeMonitor currentAQI={data.aqi} />

                {/* ========================================
                    AQI TREND GRAPH
                    Comment out to hide the 24-hour trend graph
                ======================================== */}
                <AQITrendGraph onCityChange={handleCityChange} />

                {/* ========================================
                    FILTER MAINTENANCE GUIDE
                    Comment out to hide the filter maintenance card
                ======================================== */}
                <FilterMaintenanceCard />

                {/* ========================================
                    POLLUTANT TABS (Current Pollutants & AQI Scale)
                    Comment out to hide the tabbed section
                ======================================== */}
                <PollutantTabs data={data} />

                {/* ========================================
                    CIGARETTE EQUIVALENT
                    Shows how many cigarettes worth of pollution exposure
                    Comment out to hide this section
                ======================================== */}
                <CigaretteEquivalent aqi={data.aqi} />
            </div>
        </>
    );
}
