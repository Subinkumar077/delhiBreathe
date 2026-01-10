// Skip to main content link for keyboard navigation
export default function SkipToContent() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10001] focus:bg-primary focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:font-semibold"
        >
            Skip to main content
        </a>
    );
}
