import { Users, Target, Lightbulb } from 'lucide-react';

export default function TeamSection() {
    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Meet the Team
            </h2>

            {/* Team Photo */}
            <div className="mb-12">
                <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 shadow-xl">
                    <img 
                        src="/team-photo.jpg" 
                        alt="Eco Breathe Team - 6 Engineering Students" 
                        className="w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => {
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                parent.innerHTML = `
                                    <div class="aspect-video bg-white rounded-lg flex items-center justify-center">
                                        <div class="text-center p-8">
                                            <svg class="w-24 h-24 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                            <p class="text-gray-600 font-medium">Eco Breathe Team</p>
                                            <p class="text-sm text-gray-500 mt-2">6 Engineering Students from Bhopal</p>
                                        </div>
                                    </div>
                                `;
                            }
                        }}
                    />
                </div>
            </div>

            {/* Team Description */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    We are a team of 6 passionate engineering students from Bhopal, Madhya Pradesh, united by a common goal: 
                    making clean air accessible to everyone in India.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Our diverse backgrounds in hardware engineering, software development, machine learning, and environmental science 
                    allow us to tackle air pollution from multiple angles. What started as a college project has evolved into a 
                    mission-driven initiative to deploy affordable, solar-powered air quality monitoring and purification systems 
                    across Indian cities.
                </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Provide low-cost, decentralized air purification solutions powered by renewable energy, 
                        with a primary focus on the Delhi region and expanding across India.
                    </p>
                </div>

                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lightbulb className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                        A future where clean air is not a luxury but a fundamental right for every citizen. 
                        We envision a network of sustainable air quality solutions across India.
                    </p>
                </div>

                <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Innovation, sustainability, accessibility, and transparency. We believe in open data, 
                        eco-friendly technology, and making our solutions affordable for all.
                    </p>
                </div>
            </div>
        </section>
    );
}
