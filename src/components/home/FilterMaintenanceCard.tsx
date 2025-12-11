import { Wrench, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function FilterMaintenanceCard() {
    const maintenanceSteps = [
        {
            step: 1,
            title: 'Regular Inspection',
            description: 'Check filter condition every 2 weeks for visible dust or discoloration',
            frequency: 'Bi-weekly',
            icon: Info,
        },
        {
            step: 2,
            title: 'Gentle Cleaning',
            description: 'Use a soft brush or vacuum on low setting to remove surface dust',
            frequency: 'Monthly',
            icon: Wrench,
        },
        {
            step: 3,
            title: 'Performance Check',
            description: 'Monitor airflow and efficiency indicators for reduced performance',
            frequency: 'Monthly',
            icon: AlertCircle,
        },
        {
            step: 4,
            title: 'Timely Replacement',
            description: 'Replace filter when life indicator shows critical or after 6 months',
            frequency: 'As needed',
            icon: CheckCircle2,
        },
    ];

    const tips = [
        'Avoid washing filters unless specified by manufacturer',
        'Keep the device away from direct sunlight and moisture',
        'Ensure proper sealing after filter installation',
        'Record replacement dates for maintenance tracking',
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Filter Maintenance Guide</h2>
                    <p className="text-sm text-gray-500">Follow these steps to maximize filter lifespan</p>
                </div>
            </div>

            {/* Maintenance Steps */}
            <div className="space-y-3 mb-6">
                {maintenanceSteps.map((item, index) => {
                    const Icon = item.icon;
                    const isLast = index === maintenanceSteps.length - 1;
                    return (
                        <div key={item.step} className="relative">
                            <div className="flex gap-4 p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200">
                                {/* Step Number */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                                        <span className="text-white font-bold text-lg">{item.step}</span>
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                                        <span className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full whitespace-nowrap">
                                            {item.frequency}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                            
                            {/* Connector Line */}
                            {!isLast && (
                                <div className="absolute left-5 top-[60px] w-0.5 h-3 bg-gradient-to-b from-blue-300 to-transparent" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Pro Tips Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-amber-500 rounded-md">
                        <Info className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Pro Tips</h3>
                </div>
                <ul className="space-y-2">
                    {tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Warning Banner */}
            <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-red-900">Important Notice</p>
                    <p className="text-xs text-red-700 mt-1">
                        Using a clogged or damaged filter can reduce air quality and strain the device. 
                        Always replace filters showing signs of wear or reduced performance.
                    </p>
                </div>
            </div>
        </div>
    );
}
