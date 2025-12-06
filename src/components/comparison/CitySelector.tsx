import { Plus } from 'lucide-react';

interface CitySelectorProps {
    availableCities: string[];
    onSelect: (city: string) => void;
}

export default function CitySelector({ availableCities, onSelect }: CitySelectorProps) {
    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-secondary transition-all">
                <Plus size={18} />
                <span className="font-medium">Add City</span>
            </button>

            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 hidden group-hover:block z-50 overflow-hidden">
                {availableCities.length > 0 ? (
                    availableCities.map(city => (
                        <button
                            key={city}
                            onClick={() => onSelect(city)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                        >
                            {city}
                        </button>
                    ))
                ) : (
                    <div className="px-4 py-3 text-xs text-gray-400 text-center">
                        Max cities selected
                    </div>
                )}
            </div>
        </div>
    );
}
