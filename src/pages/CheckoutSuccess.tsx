import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for pre-ordering Eco Breathe
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4 text-left">
            <Package className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ You'll receive an order confirmation email shortly</li>
                <li>✓ We'll notify you when your device is ready to ship</li>
                <li>✓ Expected delivery: 2-3 weeks</li>
                <li>✓ Track your order status via email updates</li>
              </ul>
            </div>
          </div>
        </div>

        {sessionId && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Order Reference</p>
            <p className="text-sm font-mono text-gray-700 break-all">{sessionId}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:support@ecobreathe.com" className="text-primary hover:underline">
              support@ecobreathe.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
