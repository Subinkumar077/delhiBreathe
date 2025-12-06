export interface LocationData {
    address: string;
    city: string;
    state: string;
    country: string;
    formatted: string;
}

export const reverseGeocode = async (
    lat: number,
    lon: number
): Promise<LocationData> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'DelhiBreathe/1.0'
                }
            }
        );

        if (!response.ok) throw new Error('Geocoding failed');

        const data = await response.json();
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

        // Remove duplicates (e.g., if city appears in locality or state)
        const uniqueParts = [...new Set(parts)];

        const formatted = uniqueParts.join(', ');

        return {
            address: locality || area || city || 'Delhi', // Fallback to a generic valid name if completely empty
            city: city || area,
            state: state,
            country: country,
            formatted: formatted
        };
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return {
            address: 'Location unavailable',
            city: '',
            state: '',
            country: 'India',
            formatted: `${lat.toFixed(6)}°, ${lon.toFixed(6)}°`
        };
    }
};
