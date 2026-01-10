import { Link } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import BottomNav from '../components/shared/BottomNav';
import TeamSection from '../components/about/TeamSection';
import TechnicalSpecs from '../components/about/TechnicalSpecs';
import Methodology from '../components/about/Methodology';
import Roadmap from '../components/about/Roadmap';

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            <Header />
            
            <div className="pb-16 sm:pb-0">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white mt-16 sm:mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            About Eco Breathe
                        </h1>
                        <p className="text-lg sm:text-xl text-green-50 max-w-3xl">
                            A student-led initiative combining hardware innovation, software intelligence, 
                            and renewable energy to make clean air accessible across India.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Team Section */}
                    <TeamSection />

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-12"></div>

                    {/* Technical Specs */}
                    <TechnicalSpecs />

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-12"></div>

                    {/* Methodology */}
                    <Methodology />

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-12"></div>

                    {/* Roadmap */}
                    <Roadmap />

                    {/* Bottom CTA */}
                    <div className="py-12 text-center">
                        <Link 
                            to="/dashboard"
                            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg"
                        >
                            View Live Dashboard
                        </Link>
                    </div>
                </div>
            </div>
            
            <Footer />
            <BottomNav />
        </div>
    );
}
