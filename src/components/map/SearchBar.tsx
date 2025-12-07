import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useMap } from 'react-leaflet';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const map = useMap();

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery || searchQuery.length < 3) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
            );
            const data = await response.json();
            setResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    const handleSelectLocation = (lat: string, lon: string, displayName: string) => {
        map.flyTo([parseFloat(lat), parseFloat(lon)], 13, { duration: 1.5 });
        setQuery(displayName);
        setShowResults(false);
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div className="absolute top-4 left-4 z-[400] w-full max-w-xs sm:max-w-md">
            <div className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Search city, area, or landmark..."
                        className="w-full pl-10 pr-10 py-3 bg-white rounded-xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    {query && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && results.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
                        {results.map((result, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                <div className="text-sm font-medium text-gray-900 truncate">
                                    {result.display_name.split(',')[0]}
                                </div>
                                <div className="text-xs text-gray-500 truncate mt-0.5">
                                    {result.display_name}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {showResults && results.length === 0 && !isSearching && query.length >= 3 && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-center text-sm text-gray-500">
                        No results found
                    </div>
                )}
            </div>
        </div>
    );
}

