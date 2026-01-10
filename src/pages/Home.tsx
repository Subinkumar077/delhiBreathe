import { useFirebaseData } from '../hooks/useFirebaseData';
import { useOnboarding } from '../hooks/useOnboarding';
import MainOptimized from '../components/home/MainOptimized';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import OnboardingTour from '../components/onboarding/OnboardingTour';
import AQIExplainer from '../components/onboarding/AQIExplainer';
import HelpButton from '../components/shared/HelpButton';
import SkipToContent from '../components/shared/SkipToContent';

export default function Home() {
    const { data, loading, error, connected } = useFirebaseData();
    const { 
        showOnboarding, 
        showAQIExplainer,
        completeOnboarding, 
        skipOnboarding,
        openAQIExplainer,
        closeAQIExplainer
    } = useOnboarding();

    if (loading) return <LoadingSpinner />;
    if (error || !data) return (
        <div className="text-center py-20" role="alert">
            <h2 className="text-2xl font-bold text-gray-700">Unable to load data</h2>
            <p className="text-gray-500">Please check your connection or database configuration.</p>
        </div>
    );

    return (
        <ErrorBoundary>
            <SkipToContent />
            <main id="main-content">
                <MainOptimized data={data} connected={connected} />
            </main>
            
            {/* Onboarding Tour */}
            {showOnboarding && (
                <OnboardingTour 
                    onComplete={completeOnboarding}
                    onSkip={skipOnboarding}
                />
            )}

            {/* AQI Explainer Modal */}
            {showAQIExplainer && (
                <AQIExplainer onClose={closeAQIExplainer} />
            )}

            {/* Help Button */}
            <HelpButton onClick={openAQIExplainer} label="What is AQI?" />
        </ErrorBoundary>
    );
}
