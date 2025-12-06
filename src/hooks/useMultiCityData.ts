import { useState, useEffect } from 'react';
import type { CityData } from '../types/city';
import { CITIES_LIST } from '../types/city';
import { getAqiCategory } from '../utils/aqiColors';

// Helper to generate mock history
const generateHistory = () => {
    return Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        aqi: Math.floor(Math.random() * 400) + 50
    }));
};

export const useMultiCityData = () => {
    const [selectedCities, setSelectedCities] = useState<string[]>(['Delhi']);
    const [data, setData] = useState<CityData[]>([]);

    useEffect(() => {
        // In a real app, we would fetch this from Firebase
        // For now, generating mock data for selected cities
        const newData = selectedCities.map(city => {
            const history = generateHistory();
            const currentAqi = history[history.length - 1].aqi;

            return {
                id: city,
                name: city,
                currentAqi: currentAqi,
                aqiCategory: getAqiCategory(currentAqi),
                history: history
            };
        });

        setData(newData);
    }, [selectedCities]);

    const addCity = (city: string) => {
        if (!selectedCities.includes(city) && selectedCities.length < 5) {
            setSelectedCities([...selectedCities, city]);
        }
    };

    const removeCity = (city: string) => {
        setSelectedCities(selectedCities.filter(c => c !== city));
    };

    return {
        selectedCities,
        availableCities: CITIES_LIST.filter(c => !selectedCities.includes(c)),
        data,
        addCity,
        removeCity
    };
};
