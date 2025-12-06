import { Link, useLocation } from 'react-router-dom';
import { Home, Map, BarChart2, Trophy } from 'lucide-react';
import clsx from 'clsx';

export default function BottomNav() {
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/', icon: Home },
        { label: 'Map', path: '/map', icon: Map },
        { label: 'Compare', path: '/comparison', icon: BarChart2 },
        { label: 'Rank', path: '/ranking', icon: Trophy },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 block sm:hidden pb-safe">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                'flex flex-col items-center justify-center w-full h-full space-y-1',
                                isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                            )}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
