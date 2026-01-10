import { useEffect, useRef, type ReactNode } from 'react';

interface FocusTrapProps {
    children: ReactNode;
    active: boolean;
}

// Focus trap for modals to improve keyboard navigation
export default function FocusTrap({ children, active }: FocusTrapProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active) return;

        const container = containerRef.current;
        if (!container) return;

        // Get all focusable elements
        const focusableElements = container.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element
        firstElement?.focus();

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                // Find and click close button
                const closeButton = container.querySelector<HTMLButtonElement>('[aria-label*="Close"]');
                closeButton?.click();
            }
        };

        document.addEventListener('keydown', handleTabKey);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleTabKey);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [active]);

    return <div ref={containerRef}>{children}</div>;
}
