import { useState, useEffect, useRef, type ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    placeholder?: ReactNode;
    rootMargin?: string;
    threshold?: number;
}

/**
 * Component that lazy loads its children when they come into viewport
 * Improves initial page load performance
 */
export default function LazySection({ 
    children, 
    placeholder,
    rootMargin = '100px',
    threshold = 0.01
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                rootMargin,
                threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [rootMargin, threshold]);

    return (
        <div ref={ref}>
            {isVisible ? children : (placeholder || <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />)}
        </div>
    );
}
