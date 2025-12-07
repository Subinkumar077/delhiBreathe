import { Layers } from 'lucide-react';

interface MapControlsProps {
    onLayerChange: (layer: 'street' | 'satellite') => void;
    currentLayer: 'street' | 'satellite';
}

export default function MapControls({ onLayerChange, currentLayer }: MapControlsProps) {
    return (
        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-lg border border-gray-100 p-2">
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => onLayerChange('street')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentLayer === 'street'
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Layers size={16} />
                    <span>Street</span>
                </button>
                <button
                    onClick={() => onLayerChange('satellite')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentLayer === 'satellite'
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Layers size={16} />
                    <span>Satellite</span>
                </button>
            </div>
        </div>
    );
}
