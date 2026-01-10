import { Smartphone } from 'lucide-react';

export default function AndroidApp() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Smartphone className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Available on Android
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Monitor air quality on the go with our mobile app
                </p>
                <div className="inline-flex items-center gap-3 bg-gray-100 text-gray-500 px-8 py-4 rounded-lg cursor-not-allowed">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                        <div className="text-xs font-semibold">Coming Soon on</div>
                        <div className="text-sm font-bold">Google Play</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
