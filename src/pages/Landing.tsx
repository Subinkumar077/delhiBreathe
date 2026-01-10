import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import BottomNav from '../components/shared/BottomNav';
import Hero from '../components/landing/Hero';
import ProblemStatement from '../components/landing/ProblemStatement';
import SolutionSection from '../components/landing/SolutionSection';
import PlatformFeatures from '../components/landing/PlatformFeatures';
import AndroidApp from '../components/landing/AndroidApp';
import About from '../components/landing/About';
import CTASection from '../components/landing/CTASection';

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            <Header />
            <div className="pb-16 sm:pb-0">
                <Hero />
                <ProblemStatement />
                <SolutionSection />
                <PlatformFeatures />
                <AndroidApp />
                <About />
                <CTASection />
            </div>
            <Footer />
            <BottomNav />
        </div>
    );
}
