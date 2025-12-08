import type { ReactNode } from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-16 pb-20 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
