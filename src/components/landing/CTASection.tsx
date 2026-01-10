import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Ready to Breathe Cleaner Air?
                </h2>
                <p className="text-xl text-green-50 mb-10">
                    Start monitoring air quality in your area today
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/dashboard"
                        className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-200 shadow-lg"
                    >
                        View Live Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    
                    <a 
                        href="mailto:contact@ecobreathe.com"
                        className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
