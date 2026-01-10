import ProductFeatures from './ProductFeatures';
import ProductSpecs from './ProductSpecs';

export default function SolutionSection() {
    return (
        <section id="product" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Our Solution
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A complete ecosystem combining hardware and software for cleaner, healthier air
                    </p>
                </div>

                <ProductFeatures />
                <ProductSpecs />
            </div>
        </section>
    );
}
