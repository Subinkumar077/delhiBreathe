import LegalLayout from '../components/legal/LegalLayout';

export default function TermsOfService() {
    return (
        <LegalLayout title="Terms of Service" lastUpdated="January 10, 2025">
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing and using Eco Breathe's air quality monitoring platform, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our platform.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Eco Breathe is a student-led initiative providing air quality information for educational and public benefit purposes.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Eco Breathe provides:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Real-time air quality monitoring data from our sensor network</li>
                    <li>Air Quality Index (AQI) calculations based on Indian CPCB standards</li>
                    <li>Historical data trends and comparisons</li>
                    <li>AI-powered air quality predictions</li>
                    <li>Interactive maps and visualizations</li>
                    <li>Health recommendations based on pollution levels</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    You agree to use our platform only for lawful purposes. You must not:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Attempt to gain unauthorized access to our systems or data</li>
                    <li>Interfere with or disrupt the platform's operation</li>
                    <li>Use automated systems to scrape or download excessive amounts of data</li>
                    <li>Misrepresent or manipulate our data</li>
                    <li>Use the platform for any illegal or harmful purposes</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer of Warranties</h2>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-4">
                    <p className="text-gray-800 font-semibold mb-2">IMPORTANT DISCLAIMER</p>
                    <p className="text-gray-700 leading-relaxed">
                        Eco Breathe is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either express or implied.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Accuracy</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    While we strive to provide accurate air quality information, we cannot guarantee:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>100% accuracy of sensor readings</li>
                    <li>Continuous availability of data</li>
                    <li>Real-time updates without delays</li>
                    <li>Completeness of historical data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Not Medical Advice</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    The information provided by Eco Breathe is for informational purposes only and should not be considered medical advice. 
                    Health recommendations are general guidelines and may not be suitable for everyone.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Always consult with qualified healthcare professionals</strong> for medical advice, especially if you have respiratory conditions or health concerns.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    To the maximum extent permitted by law, Eco Breathe and its team members shall not be liable for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Any direct, indirect, incidental, or consequential damages</li>
                    <li>Loss of data, profits, or business opportunities</li>
                    <li>Health issues or medical conditions</li>
                    <li>Decisions made based on our data</li>
                    <li>Service interruptions or technical failures</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                    You use our platform at your own risk and discretion.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    All content, design, code, and materials on Eco Breathe are owned by the Eco Breathe team and protected by intellectual property laws.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Open Data</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Environmental data collected by our sensors is made publicly available for educational and research purposes. 
                    You may use this data with proper attribution to Eco Breathe.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Platform Code and Design</h3>
                <p className="text-gray-700 leading-relaxed">
                    The platform's source code, design, and branding remain the property of Eco Breathe. 
                    You may not copy, modify, or distribute our platform without permission.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links and Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform may contain links to third-party websites or services (such as OpenStreetMap). 
                    We are not responsible for the content, privacy practices, or terms of these third parties.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Your use of third-party services is at your own risk and subject to their terms and policies.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Modifications and Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Modify, suspend, or discontinue any part of the platform at any time</li>
                    <li>Update these Terms of Service without prior notice</li>
                    <li>Restrict access to certain features or data</li>
                    <li>Terminate the platform entirely if necessary</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                    As a student project, we cannot guarantee long-term availability of the platform.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    These Terms of Service shall be governed by and construed in accordance with the laws of India.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Any disputes arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction 
                    of the courts in Bhopal, Madhya Pradesh, India.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                    You agree to indemnify and hold harmless Eco Breathe and its team members from any claims, damages, losses, or expenses 
                    arising from your use of the platform or violation of these terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                    If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                    We may update these Terms of Service from time to time. Changes will be posted on this page with an updated "Last Updated" date. 
                    Your continued use of the platform after changes constitutes acceptance of the new terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-green-50 border-l-4 border-primary p-4 rounded-r-lg">
                    <p className="text-gray-700"><strong>Email:</strong> contact@ecobreathe.com</p>
                    <p className="text-gray-700"><strong>Location:</strong> Bhopal, Madhya Pradesh, India</p>
                </div>
            </section>

            <section>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-sm text-blue-900 mb-3">
                        <strong>Acknowledgment:</strong> By using Eco Breathe, you acknowledge that you have read, understood, 
                        and agree to be bound by these Terms of Service.
                    </p>
                    <p className="text-sm text-blue-900">
                        <strong>Student Project Notice:</strong> Eco Breathe is developed and maintained by engineering students 
                        for educational and public benefit purposes. We appreciate your understanding and support.
                    </p>
                </div>
            </section>
        </LegalLayout>
    );
}
