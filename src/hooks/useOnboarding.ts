import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'ecobreathe_onboarding_completed';
const AQI_EXPLAINER_KEY = 'ecobreathe_aqi_explainer_shown';

export function useOnboarding() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showAQIExplainer, setShowAQIExplainer] = useState(false);

    useEffect(() => {
        // Check if user has completed onboarding
        const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY);
        
        if (!hasCompletedOnboarding) {
            // Show onboarding after a short delay
            const timer = setTimeout(() => {
                setShowOnboarding(true);
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, []);

    const completeOnboarding = () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        setShowOnboarding(false);
    };

    const skipOnboarding = () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        setShowOnboarding(false);
    };

    const resetOnboarding = () => {
        localStorage.removeItem(ONBOARDING_KEY);
        setShowOnboarding(true);
    };

    const openAQIExplainer = () => {
        setShowAQIExplainer(true);
        localStorage.setItem(AQI_EXPLAINER_KEY, 'true');
    };

    const closeAQIExplainer = () => {
        setShowAQIExplainer(false);
    };

    return {
        showOnboarding,
        showAQIExplainer,
        completeOnboarding,
        skipOnboarding,
        resetOnboarding,
        openAQIExplainer,
        closeAQIExplainer
    };
}
