import LegalLayout from '../components/legal/LegalLayout';

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="January 10, 2025">
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to Eco Breathe. We are committed to protecting your privacy and being transparent about our data practices. 
                    This Privacy Policy explains how we collect, use, and protect information when you use our air quality monitoring platform.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Eco Breathe is a student-led initiative developed by a team of 6 engineering students in Bhopal, India. 
                    Our mission is to provide accessible air quality information to everyone.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Environmental Data</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    We collect air quality data from our network of solar-powered sensors, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>PM2.5 and PM10 particulate matter levels</li>
                    <li>Carbon Monoxide (CO) concentrations</li>
                    <li>Nitrogen Dioxide (NO2) levels</li>
                    <li>Ammonia (NH3) measurements</li>
                    <li>Geographic coordinates of sensor locations</li>
                    <li>Timestamp of measurements</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    We do not collect personal information, user accounts, or tracking data. Our platform is completely anonymous and public.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    The environmental data we collect is used to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Display real-time air quality information on our dashboard</li>
                    <li>Generate Air Quality Index (AQI) calculations using Indian CPCB standards</li>
                    <li>Create historical trends and comparisons</li>
                    <li>Train AI models for air quality predictions</li>
                    <li>Provide health recommendations based on pollution levels</li>
                    <li>Research and improve air quality monitoring technology</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Our environmental data is stored securely using Firebase Realtime Database. We implement industry-standard security measures to protect data integrity and availability.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Since we do not collect personal information, there is no personally identifiable data at risk.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    We use the following third-party services to operate our platform:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Firebase (Google):</strong> For data storage and hosting</li>
                    <li><strong>OpenStreetMap:</strong> For displaying interactive maps</li>
                    <li><strong>Nominatim:</strong> For geocoding and location services</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                    These services may have their own privacy policies. We recommend reviewing them if you have concerns.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed">
                    We do not use cookies or tracking technologies. Our platform does not track individual users or their behavior.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    All environmental data collected by our sensors is publicly available through our platform. We believe in open data for public health.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    We do not sell, rent, or share any data with third parties for commercial purposes.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                    Our platform is suitable for all ages. Since we do not collect personal information, there are no special considerations for children's privacy.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Since we do not collect personal information, there is no personal data to access, modify, or delete. 
                    All environmental data is public and available to everyone.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    If you have questions about our data practices, please contact us at contact@ecobreathe.com.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. 
                    We encourage you to review this policy periodically.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="bg-green-50 border-l-4 border-primary p-4 rounded-r-lg">
                    <p className="text-gray-700"><strong>Email:</strong> contact@ecobreathe.com</p>
                    <p className="text-gray-700"><strong>Location:</strong> Bhopal, Madhya Pradesh, India</p>
                </div>
            </section>

            <section>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-sm text-blue-900">
                        <strong>Note:</strong> Eco Breathe is a student project developed for educational and public benefit purposes. 
                        We are committed to transparency and responsible data practices.
                    </p>
                </div>
            </section>
        </LegalLayout>
    );
}
