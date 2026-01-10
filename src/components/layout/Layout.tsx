import type { ReactNode } from 'react';
import Header from '../shared/Header';
import BottomNav from '../shared/BottomNav';
import Footer from '../shared/Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-16 pb-20 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
