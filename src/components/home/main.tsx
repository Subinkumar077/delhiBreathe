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
 * 7. AQI Trend Graph
 * 8. Pollutant Tabs (Current Pollutants & AQI Scale)
 * 9. Pollutant Detail Modal
 * 
 * ============================================
 */

import { useState } from 'react';
import AQIHero from './AQIHero';
import AQIScale from './AQIScale';
// import AQITrendGraph from './AQITrendGraph'; // Uncomment to enable AQI Trend Graph
import PollutantTabs from './PollutantTabs';
import PollutantCard from './PollutantCard';
import PollutantModal from './PollutantModal';
import LocationCard from './LocationCard';
import LiveStatus from './LiveStatus';
import FilterLifeCard from './FilterLifeCard';
import { Wind, CloudFog, Flame, Pipette, Droplets } from 'lucide-react';
import type { SensorReading } from '../../types/sensor';

interface HomeMainProps {
    data: SensorReading;
    connected: boolean;
}

export default function HomeMain({ data, connected }: HomeMainProps) {
    const [selectedPollutant, setSelectedPollutant] = useState<{
        id: string;
        value: number;
        unit: string;
    } | null>(null);

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
                    MAIN LAYOUT: AQI HERO + LOCATION CARDS
                    Comment out to hide this entire section
                ======================================== */}
                {/* Top Row: AQI Hero + Right Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AQI Hero Card - Takes 2/3 width - Comment out to hide */}
                    <div className="lg:col-span-2">
                        <AQIHero data={data} />
                    </div>

                    {/* Right Column - Takes 1/3 width */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Location Card - Comment out to hide */}
                        <LocationCard lat={data.lat} lon={data.lon} sats={data.sats} />

                        {/* Filter Life Card - Comment out to hide */}
                        <FilterLifeCard />
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
                            onClick={() => setSelectedPollutant({ id: 'PM2_5', value: data.pm25, unit: 'µg/m³' })}
                        />

                        {/* PM10 Card - Comment out to hide */}
                        <PollutantCard
                            label="PM10"
                            value={data.pm10}
                            unit="µg/m³"
                            icon={CloudFog}
                            colorClass="bg-blue-500"
                            onClick={() => setSelectedPollutant({ id: 'PM10', value: data.pm10, unit: 'µg/m³' })}
                        />

                        {/* CO Card - Comment out to hide */}
                        <PollutantCard
                            label="CO"
                            value={data.gas1_ppm * 1.145}
                            unit="mg/m³"
                            icon={Flame}
                            colorClass="bg-red-500"
                            onClick={() => setSelectedPollutant({ id: 'CO', value: data.gas1_ppm * 1.145, unit: 'mg/m³' })}
                        />

                        {/* NO2 Card - Comment out to hide */}
                        <PollutantCard
                            label="NO2"
                            value={data.gas2_ppm}
                            unit="ppm"
                            icon={Pipette}
                            colorClass="bg-orange-500"
                            onClick={() => setSelectedPollutant({ id: 'NO2', value: data.gas2_ppm, unit: 'ppm' })}
                        />

                        {/* NH3 Card - Comment out to hide */}
                        <PollutantCard
                            label="NH3"
                            value={data.gas3_ppm}
                            unit="ppm"
                            icon={Droplets}
                            colorClass="bg-teal-500"
                            onClick={() => setSelectedPollutant({ id: 'NH3', value: data.gas3_ppm, unit: 'ppm' })}
                        />
                    </div>
                </div>

                {/* ========================================
                    AQI TREND GRAPH
                    Comment out to hide the 24-hour trend graph
                ======================================== */}
                {/* <AQITrendGraph /> */}

                {/* ========================================
                    POLLUTANT TABS (Current Pollutants & AQI Scale)
                    Comment out to hide the tabbed section
                ======================================== */}
                <PollutantTabs data={data} />
            </div>

            {/* ========================================
                POLLUTANT DETAIL MODAL
                Comment out to disable modal functionality
            ======================================== */}
            {selectedPollutant && (
                <PollutantModal
                    pollutantId={selectedPollutant.id}
                    currentValue={selectedPollutant.value}
                    unit={selectedPollutant.unit}
                    onClose={() => setSelectedPollutant(null)}
                />
            )}
        </>
    );
}
