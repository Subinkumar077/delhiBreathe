import { useState } from 'react';
import { Search } from 'lucide-react';
import { useMap } from 'react-leaflet';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const map = useMap();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const results = await response.json();

            if (results && results.length > 0) {
                const { lat, lon } = results[0];
                map.flyTo([parseFloat(lat), parseFloat(lon)], 13, { duration: 1.5 });
            }
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <div className="absolute top-4 left-4 z-[400] w-full max-w-xs sm:max-w-sm">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city or area..."
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-lg border-0 focus:ring-2 focus:ring-primary/50 text-sm outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </form>
        </div>
    );
}
