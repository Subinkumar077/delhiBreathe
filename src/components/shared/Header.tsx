import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import UserMenu from '../auth/UserMenu';

export default function Header() {
    const location = useLocation();
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/map', label: 'Map' },
        { path: '/comparison', label: 'Comparison' },
        { path: '/ranking', label: 'Ranking' },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img 
                                src="/logo.png"
                                alt="Eco Breathe Logo"
                                className="w-8 h-8 rounded-lg object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const leaf = document.createElement('div');
                                    leaf.innerHTML = '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>';
                                    e.currentTarget.parentElement?.insertBefore(leaf.firstChild!, e.currentTarget);
                                }}
                            />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Eco Breathe
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive(link.path)
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {/* Auth Section */}
                            <div className="ml-4 flex items-center gap-2 border-l border-gray-200 pl-4">
                                {user ? (
                                    <UserMenu />
                                ) : (
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Auth Modal */}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}
