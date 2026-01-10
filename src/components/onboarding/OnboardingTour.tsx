import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import FocusTrap from '../shared/FocusTrap';

interface OnboardingStep {
    title: string;
    description: string;
    image?: string;
    icon?: string;
}

const onboardingSteps: OnboardingStep[] = [
    {
        title: 'Welcome to Eco Breathe! 🌱',
        description: 'Your real-time air quality monitoring platform. We help you understand and track air pollution levels with AI-powered predictions.',
        icon: '👋'
    },
    {
        title: 'Real-Time AQI Monitoring',
        description: 'See current Air Quality Index (AQI) from our solar-powered sensors in Bhopal. The color-coded scale helps you understand air quality at a glance.',
        icon: '📊'
    },
    {
        title: 'Track 5 Major Pollutants',
        description: 'Monitor PM2.5, PM10, CO, NO2, and NH3 levels. Click any pollutant card to learn more about its health effects and sources.',
        icon: '🔬'
    },
    {
        title: 'AI-Powered Predictions',
        description: 'Our LSTM neural network predicts air quality for the next 24 hours, 7 days, and 30 days. Plan ahead and stay protected.',
        icon: '🤖'
    },
    {
        title: 'Interactive Features',
        description: 'Explore the map view, compare cities, check rankings, and chat with our AI assistant for instant answers about air quality.',
        icon: '🗺️'
    },
    {
        title: 'Understanding AQI',
        description: 'AQI ranges from 0-500. Good (0-50), Moderate (51-100), Unhealthy for Sensitive Groups (101-150), Unhealthy (151-200), Very Unhealthy (201-300), Hazardous (301+).',
        icon: '📈'
    }
];

interface OnboardingTourProps {
    onComplete: () => void;
    onSkip: () => void;
}

export default function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
    };

    const handleSkipTour = () => {
        setIsVisible(false);
        setTimeout(onSkip, 300);
    };

    const step = onboardingSteps[currentStep];
    const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
        >
            <FocusTrap active={isVisible}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-scale-in">
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200">
                    <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12">
                    {/* Close Button */}
                    <button
                        onClick={handleSkipTour}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close onboarding"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Icon */}
                    <div className="text-6xl mb-6 text-center">
                        {step.icon}
                    </div>

                    {/* Title */}
                    <h2 id="onboarding-title" className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        {step.title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
                        {step.description}
                    </p>

                    {/* Step Indicators */}
                    <div className="flex justify-center gap-2 mb-8">
                        {onboardingSteps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentStep 
                                        ? 'w-8 bg-primary' 
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to step ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                currentStep === 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>

                        <button
                            onClick={handleSkipTour}
                            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                        >
                            Skip Tour
                        </button>

                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                </div>
            </FocusTrap>
        </div>
    );
}
