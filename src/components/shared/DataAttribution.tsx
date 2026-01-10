import { Info } from 'lucide-react';

export default function DataAttribution() {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
                <p className="font-semibold text-blue-900 mb-1">Data Source</p>
                <p className="text-blue-700 leading-relaxed">
                    Real-time data from our solar-powered sensor network in Bhopal, India. 
                    AQI calculated using <span className="font-medium">Indian CPCB standards</span>. 
                    Data updates every 5 minutes.
                </p>
            </div>
        </div>
    );
}
