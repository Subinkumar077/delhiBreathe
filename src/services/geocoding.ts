export interface LocationData {
    address: string;
    city: string;
    state: string;
    country: string;
    formatted: string;
    lat: number;
    lon: number;
    timestamp: number;
}

const CACHE_KEY = 'ecobreathe_location_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Get cached location from localStorage
const getCachedLocation = (lat: number, lon: number): LocationData | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const data: LocationData = JSON.parse(cached);
        
        // Check if cache is still valid (within 24 hours)
        const isExpired = Date.now() - data.timestamp > CACHE_DURATION;
        if (isExpired) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        // Check if coordinates match (within 0.001 degrees ~100m)
        const latMatch = Math.abs(data.lat - lat) < 0.001;
        const lonMatch = Math.abs(data.lon - lon) < 0.001;
        
        if (latMatch && lonMatch) {
            console.log('Using cached location:', data);
            return data;
        }

        return null;
    } catch (error) {
        console.error('Error reading location cache:', error);
        return null;
    }
};

// Save location to localStorage
const cacheLocation = (location: LocationData): void => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(location));
        console.log('Location cached successfully');
    } catch (error) {
        console.error('Error caching location:', error);
    }
};

export const reverseGeocode = async (
    lat: number,
    lon: number
): Promise<LocationData> => {
    // Validate coordinates - reject invalid values
    if (!lat || !lon || lat === 0 || lon === 0 || isNaN(lat) || isNaN(lon)) {
        console.warn('Invalid coordinates provided:', { lat, lon });
        
        // Try to return last cached location
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const data: LocationData = JSON.parse(cached);
            console.log('Using last known location from cache');
            return data;
        }
        
        // Ultimate fallback
        return {
            address: 'Delhi Air Quality Monitor',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India',
            formatted: 'Delhi, India',
            lat: 28.6139,
            lon: 77.2090,
            timestamp: Date.now()
        };
    }

    // Check cache first
    const cached = getCachedLocation(lat, lon);
    if (cached) {
        return cached;
    }

    try {
        // Add a small delay to respect rate limits (1 request per second)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EcoBreathe/1.0 (https://ecobreathe.com)'
                }
            }
        );

        if (!response.ok) {
            console.warn('Geocoding API returned non-OK status:', response.status);
            throw new Error(`Geocoding failed with status ${response.status}`);
        }

        const data = await response.json();
        
        // Log the response for debugging
        console.log('Geocoding API response:', data);

        const addr = data.address || {};

        // Prioritize meaningful local names
        const locality = addr.road || addr.neighbourhood || addr.suburb || addr.residential || '';
        const area = addr.city_district || addr.county || '';
        const city = addr.city || addr.town || addr.village || addr.municipality || '';
        const state = addr.state || '';
        const country = addr.country || '';
        const postcode = addr.postcode || '';

        // Construct a cleaner detailed address
        // Filter out "Unknown" and falsy values
        const parts = [locality, area, city, state, postcode, country].filter(p => p && p.toLowerCase() !== 'unknown');

        // Remove duplicates
        const uniqueParts = [...new Set(parts)];
        const formatted = uniqueParts.join(', ');

        const locationData: LocationData = {
            address: locality || area || city || 'Delhi',
            city: city || area || 'Delhi',
            state: state || 'India',
            country: country || 'India',
            formatted: formatted || `${city || 'Delhi'}, ${state || 'India'}`,
            lat,
            lon,
            timestamp: Date.now()
        };

        // Cache the successful result
        cacheLocation(locationData);

        return locationData;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        
        // Try to return last cached location (even if coordinates don't match)
        const anyCached = localStorage.getItem(CACHE_KEY);
        if (anyCached) {
            const data: LocationData = JSON.parse(anyCached);
            console.log('Using last known location as fallback');
            return data;
        }
        
        // Ultimate fallback with actual coordinates
        return {
            address: 'Air Quality Monitor',
            city: 'Delhi',
            state: 'India',
            country: 'India',
            formatted: 'Delhi, India',
            lat,
            lon,
            timestamp: Date.now()
        };
    }
};
