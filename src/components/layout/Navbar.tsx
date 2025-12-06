import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Air Pollution Map', path: '/map' },
        { label: 'Comparison', path: '/comparison' },
        { label: 'Ranking', path: '/ranking' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-gray-200 hidden sm:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            D
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Delhi Breathe
                        </span>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                                        location.pathname === item.path
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
