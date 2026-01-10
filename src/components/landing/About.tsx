export default function About() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        About Eco Breathe
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Eco Breathe is a student-led initiative focused on making clean air accessible and affordable 
                            across India. Our mission is to provide low-cost, decentralized air purification solutions 
                            powered by renewable energy, with a primary focus on the Delhi region.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Built by a team of 6 passionate engineering students in Bhopal, we combine hardware innovation 
                            with software intelligence to create a complete air quality ecosystem. Our solar-powered devices 
                            eliminate electricity costs while our real-time monitoring platform keeps you informed.
                        </p>
                        
                        <div className="bg-green-50 border-l-4 border-primary p-6 rounded-r-lg">
                            <p className="text-gray-700 font-medium mb-2">Our Vision</p>
                            <p className="text-gray-600">
                                To deploy affordable, sustainable air purification systems across India, ensuring that 
                                clean air is not a luxury but a fundamental right for every citizen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
