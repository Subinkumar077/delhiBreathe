import { useMultiCityData } from '../hooks/useMultiCityData';
import ComparisonChart from '../components/comparison/ComparisonChart';
import ComparisonCard from '../components/comparison/ComparisonCard';
import CitySelector from '../components/comparison/CitySelector';

export default function Comparison() {
    const { data, availableCities, addCity, removeCity } = useMultiCityData();

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Compare Cities</h1>
                    <p className="text-gray-500">Analyze air quality trends across locations</p>
                </div>
                <CitySelector availableCities={availableCities} onSelect={addCity} />
            </div>

            <ComparisonChart data={data} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.map((city, index) => (
                    <ComparisonCard
                        key={city.id}
                        data={city}
                        onRemove={removeCity}
                        colorIndex={index}
                    />
                ))}
            </div>
        </div>
    );
}
