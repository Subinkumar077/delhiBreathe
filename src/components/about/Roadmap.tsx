import { MapPin, Smartphone, Network, Zap, Globe, Award } from 'lucide-react';

const milestones = [
    {
        phase: 'Phase 1',
        status: 'completed',
        title: 'Prototype & Testing',
        description: 'Developed and tested solar-powered air quality monitoring device in Bhopal',
        icon: Zap,
        date: '2024'
    },
    {
        phase: 'Phase 2',
        status: 'current',
        title: 'Platform Launch',
        description: 'Web dashboard with real-time monitoring, AI predictions, and mobile app development',
        icon: Smartphone,
        date: '2025 Q1'
    },
    {
        phase: 'Phase 3',
        status: 'upcoming',
        title: 'Delhi Deployment',
        description: 'Deploy 50+ monitoring stations across Delhi NCR region',
        icon: MapPin,
        date: '2025 Q2-Q3'
    },
    {
        phase: 'Phase 4',
        status: 'upcoming',
        title: 'Network Expansion',
        description: 'Expand to 10 major Indian cities with 200+ monitoring stations',
        icon: Network,
        date: '2025 Q4'
    },
    {
        phase: 'Phase 5',
        status: 'future',
        title: 'National Coverage',
        description: 'Nationwide network with community partnerships and government collaboration',
        icon: Globe,
        date: '2026'
    },
    {
        phase: 'Phase 6',
        status: 'future',
        title: 'Certification & Scale',
        description: 'Obtain environmental certifications and scale production for mass deployment',
        icon: Award,
        date: '2026+'
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-700 border-green-300';
        case 'current':
            return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'upcoming':
            return 'bg-orange-100 text-orange-700 border-orange-300';
        case 'future':
            return 'bg-gray-100 text-gray-700 border-gray-300';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'completed':
            return 'Completed';
        case 'current':
            return 'In Progress';
        case 'upcoming':
            return 'Planned';
        case 'future':
            return 'Future';
        default:
            return status;
    }
};

export default function Roadmap() {
    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Our Roadmap
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                From a student project to a nationwide air quality network
            </p>

            <div className="relative">
                {/* Timeline line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300"></div>

                {/* Milestones */}
                <div className="space-y-12">
                    {milestones.map((milestone, index) => {
                        const Icon = milestone.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div 
                                key={index}
                                className={`relative flex items-center ${
                                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                } flex-col`}
                            >
                                {/* Content Card */}
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                                milestone.status === 'completed' ? 'bg-green-100' :
                                                milestone.status === 'current' ? 'bg-blue-100' :
                                                milestone.status === 'upcoming' ? 'bg-orange-100' :
                                                'bg-gray-100'
                                            }`}>
                                                <Icon className={`w-6 h-6 ${
                                                    milestone.status === 'completed' ? 'text-green-600' :
                                                    milestone.status === 'current' ? 'text-blue-600' :
                                                    milestone.status === 'upcoming' ? 'text-orange-600' :
                                                    'text-gray-600'
                                                }`} />
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(milestone.status)}`}>
                                                {getStatusLabel(milestone.status)}
                                            </span>
                                        </div>
                                        <div className="text-sm font-semibold text-primary mb-1">
                                            {milestone.phase}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                            {milestone.description}
                                        </p>
                                        <div className="text-xs text-gray-500 font-medium">
                                            {milestone.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 ${
                                    milestone.status === 'completed' ? 'bg-green-500' :
                                    milestone.status === 'current' ? 'bg-blue-500' :
                                    milestone.status === 'upcoming' ? 'bg-orange-500' :
                                    'bg-gray-400'
                                }"></div>

                                {/* Spacer for opposite side */}
                                <div className="hidden md:block w-5/12"></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Join Us on This Journey</h3>
                <p className="text-lg text-green-50 mb-6 max-w-2xl mx-auto">
                    We're looking for partners, sponsors, and collaborators to help us scale our impact. 
                    Together, we can make clean air accessible to millions.
                </p>
                <a 
                    href="mailto:contact@ecobreathe.com"
                    className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
                >
                    Get in Touch
                </a>
            </div>
        </section>
    );
}
