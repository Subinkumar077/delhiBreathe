import type { ReactNode } from 'react';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import BottomNav from '../shared/BottomNav';

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
            <Header />
            
            <div className="flex-grow pb-16 sm:pb-0">
                {/* Page Title Section */}
                <div className="bg-white border-b border-gray-200 mt-16 sm:mt-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500 mt-2">Last Updated: {lastUpdated}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
            <BottomNav />
        </div>
    );
}
