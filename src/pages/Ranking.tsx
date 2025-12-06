import { useState, useEffect } from 'react';
import RankingTable from '../components/ranking/RankingTable';
import RankingCard from '../components/ranking/RankingCard';
import { getAqiCategory } from '../utils/aqiColors';
import { CITIES_LIST } from '../types/city';
import { ArrowUpDown } from 'lucide-react';

export default function Ranking() {
    const [cities, setCities] = useState<any[]>([]);
    const [sortAsc, setSortAsc] = useState(false); // Default: Worst (High AQI) first

    useEffect(() => {
        // Generate full mock list
        const mockData = CITIES_LIST.map(name => {
            const aqi = Math.floor(Math.random() * 450) + 30;
            return {
                name,
                aqi,
                category: getAqiCategory(aqi),
                trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
            };
        });
        setCities(mockData);
    }, []);

    const sortedCities = [...cities].sort((a, b) =>
        sortAsc ? a.aqi - b.aqi : b.aqi - a.aqi
    );

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">City Rankings</h1>
                    <p className="text-gray-500">Real-time air quality index rankings</p>
                </div>
                <button
                    onClick={() => setSortAsc(!sortAsc)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    <ArrowUpDown size={16} />
                    {sortAsc ? 'Least Polluted First' : 'Most Polluted First'}
                </button>
            </div>

            <RankingTable data={sortedCities} />

            <div className="md:hidden">
                {sortedCities.map((city, index) => (
                    <RankingCard key={city.name} data={city} rank={index + 1} />
                ))}
            </div>
        </div>
    );
}
