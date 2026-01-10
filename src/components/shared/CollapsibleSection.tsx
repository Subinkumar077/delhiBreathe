import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

interface CollapsibleSectionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    icon?: ReactNode;
    badge?: string | number;
    className?: string;
}

export default function CollapsibleSection({ 
    title, 
    children, 
    defaultOpen = true,
    icon,
    badge,
    className = ''
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={clsx('bg-white rounded-xl shadow-md overflow-hidden', className)}>
            {/* Header - Always visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} section`}
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex-shrink-0 text-primary">
                            {icon}
                        </div>
                    )}
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-left">
                        {title}
                    </h2>
                    {badge !== undefined && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                            {badge}
                        </span>
                    )}
                </div>
                
                <div className="flex-shrink-0 text-gray-500">
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                </div>
            </button>

            {/* Content - Collapsible */}
            <div
                className={clsx(
                    'transition-all duration-300 ease-in-out overflow-hidden',
                    isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="px-6 pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
