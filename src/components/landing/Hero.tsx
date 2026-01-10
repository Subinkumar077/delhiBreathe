import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Leaf className="w-4 h-4" />
                            Made in India • Eco-Friendly
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Know What You're <span className="text-primary">Breathing</span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                            Monitor air pollution levels across Indian cities in real-time with AI-powered predictions and solar-powered purification technology.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link 
                                to="/dashboard"
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Check Air Quality Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            
                            <a 
                                href="#product"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200"
                            >
                                Learn About Our Device
                            </a>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200">
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
                                <div className="text-xs sm:text-sm text-gray-600 mt-1">Solar Powered</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
                                <div className="text-xs sm:text-sm text-gray-600 mt-1">Real-time Data</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-primary">AI</div>
                                <div className="text-xs sm:text-sm text-gray-600 mt-1">Predictions</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Product Image */}
                    <div className="relative mt-8 lg:mt-0">
                        <div className="relative z-10 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 sm:p-8 shadow-2xl">
                            <img 
                                src="/product-image.png" 
                                alt="Eco Breathe Air Purifier" 
                                className="w-full h-auto rounded-lg"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                        parent.innerHTML = '<div class="aspect-square bg-white rounded-lg flex items-center justify-center"><div class="text-center p-8"><svg class="w-24 h-24 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg><p class="text-gray-600 font-medium">Eco Breathe Device</p></div></div>';
                                    }
                                }}
                            />
                        </div>
                        
                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg z-20 text-sm sm:text-base">
                            Zero Electricity Cost
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent opacity-50"></div>
        </section>
    );
}
