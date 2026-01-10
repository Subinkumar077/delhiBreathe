import { HelpCircle } from 'lucide-react';

interface HelpButtonProps {
    onClick: () => void;
    label?: string;
}

export default function HelpButton({ onClick, label = 'Help' }: HelpButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-6 z-[9998] bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
            aria-label={label}
            title={label}
        >
            <HelpCircle className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
                {label}
            </span>
        </button>
    );
}
