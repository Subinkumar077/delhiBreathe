export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                </div>
            </div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Live Data...</p>
        </div>
    );
}
