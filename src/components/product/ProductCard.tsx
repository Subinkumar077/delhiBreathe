import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Truck, Award } from 'lucide-react';

interface ProductCardProps {
  onPreOrder: () => void;
}

export default function ProductCard({ onPreOrder }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Placeholder images - user will replace these
  const productImages = [
    'https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe+Front',
    'https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe+Side',
    'https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe+Back',
    'https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe+Top',
    'https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe+Display',
    'https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe+Detail'
  ];

  // Auto-rotate images every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Main Image Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
          {/* Images with fade transition */}
          {productImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Eco Breathe - View ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
            {currentImageIndex + 1} / {productImages.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-6 gap-2 mt-4">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentImageIndex === index
                  ? 'border-primary shadow-md scale-105 ring-2 ring-primary/30'
                  : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-8">
        

        {/* Pre-Order Button */}
        <button
          onClick={onPreOrder}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Pre-Order Now
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Secure checkout • Limited stock available
        </p>
      </div>
    </div>
  );
}
