import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="w-6 h-6 text-green-400" />
                            <span className="text-xl font-bold text-white">Eco Breathe</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Making clean air accessible and affordable across India through solar-powered innovation.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
                            <li><Link to="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/map" className="hover:text-green-400 transition-colors">Air Pollution Map</Link></li>
                            <li><Link to="/comparison" className="hover:text-green-400 transition-colors">City Comparison</Link></li>
                            <li><Link to="/ranking" className="hover:text-green-400 transition-colors">Rankings</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                        
                        <h3 className="text-white font-semibold mb-4 mt-6">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="mailto:contact@ecobreathe.com" className="hover:text-green-400 transition-colors">
                                    contact@ecobreathe.com
                                </a>
                            </li>
                            <li className="text-gray-400">Bhopal, India</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p className="mb-2">
                        <span className="font-semibold text-gray-300">Data Source:</span> Real-time sensor network powered by solar energy • 
                        Live monitoring from Bhopal, India • 
                        AQI calculated using Indian CPCB standards
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                        Sensor data updates every 5 minutes • Historical data available for analysis
                    </p>
                    <p>
                        © {new Date().getFullYear()} Eco Breathe. Built with ❤️ by engineering students.
                    </p>
                </div>
            </div>
        </footer>
    );
}
