import { useState, useEffect } from 'react';
import { reverseGeocode, type LocationData } from '../services/geocoding';

export const useLocationName = (lat: number | null, lon: number | null) => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (lat && lon) {
            setLoading(true);
            reverseGeocode(lat, lon)
                .then(setLocation)
                .finally(() => setLoading(false));
        }
    }, [lat, lon]);

    return { location, loading };
};
