// Mock AQI data for different cities
export interface CityData {
    name: string;
    coordinates: { lat: number; lon: number };
    baseAQI: number; // Base AQI for generating realistic variations
    state: string;
    area: string;
}

export const CITIES: Record<string, CityData> = {
    pune: {
        name: 'Pune',
        coordinates: { lat: 18.5204, lon: 73.8567 },
        baseAQI: 150, // Will use real sensor data
        state: 'Maharashtra',
        area: 'Shivajinagar'
    },
    delhi: {
        name: 'Delhi',
        coordinates: { lat: 28.6139, lon: 77.2090 },
        baseAQI: 280,
        state: 'Delhi',
        area: 'Connaught Place'
    },
    mumbai: {
        name: 'Mumbai',
        coordinates: { lat: 19.0760, lon: 72.8777 },
        baseAQI: 120,
        state: 'Maharashtra',
        area: 'Bandra West'
    },
    kolkata: {
        name: 'Kolkata',
        coordinates: { lat: 22.5726, lon: 88.3639 },
        baseAQI: 180,
        state: 'West Bengal',
        area: 'Park Street'
    },
    chennai: {
        name: 'Chennai',
        coordinates: { lat: 13.0827, lon: 80.2707 },
        baseAQI: 90,
        state: 'Tamil Nadu',
        area: 'T. Nagar'
    },
    hyderabad: {
        name: 'Hyderabad',
        coordinates: { lat: 17.3850, lon: 78.4867 },
        baseAQI: 110,
        state: 'Telangana',
        area: 'Banjara Hills'
    },
    ahmedabad: {
        name: 'Ahmedabad',
        coordinates: { lat: 23.0225, lon: 72.5714 },
        baseAQI: 160,
        state: 'Gujarat',
        area: 'Navrangpura'
    },
    lucknow: {
        name: 'Lucknow',
        coordinates: { lat: 26.8467, lon: 80.9462 },
        baseAQI: 200,
        state: 'Uttar Pradesh',
        area: 'Hazratganj'
    }
};

// Generate mock data for a city based on time period
export const generateMockData = (
    cityKey: string,
    timePeriod: '12h' | '24h' | '7d' | '30d' | '1y',
    count: number
): { timestamp: number; aqi: number }[] => {
    const city = CITIES[cityKey];
    const baseAQI = city.baseAQI;
    const now = Date.now();
    const data: { timestamp: number; aqi: number }[] = [];

    // Calculate time interval based on period
    let interval: number;
    switch (timePeriod) {
        case '12h':
            interval = (12 * 60 * 60 * 1000) / count; // 12 hours
            break;
        case '24h':
            interval = (24 * 60 * 60 * 1000) / count; // 24 hours
            break;
        case '7d':
            interval = (7 * 24 * 60 * 60 * 1000) / count; // 7 days
            break;
        case '30d':
            interval = (30 * 24 * 60 * 60 * 1000) / count; // 30 days
            break;
        case '1y':
            interval = (365 * 24 * 60 * 60 * 1000) / count; // 1 year
            break;
    }

    for (let i = 0; i < count; i++) {
        const timestamp = now - (count - i - 1) * interval;
        
        // Generate realistic AQI variations
        const hourOfDay = new Date(timestamp).getHours();
        const dayOfWeek = new Date(timestamp).getDay();
        
        // Morning and evening peaks (traffic hours)
        let timeMultiplier = 1;
        if (hourOfDay >= 7 && hourOfDay <= 10) timeMultiplier = 1.3; // Morning peak
        if (hourOfDay >= 18 && hourOfDay <= 21) timeMultiplier = 1.2; // Evening peak
        if (hourOfDay >= 0 && hourOfDay <= 5) timeMultiplier = 0.8; // Night low
        
        // Weekend effect (slightly better air quality)
        const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.9 : 1;
        
        // Random variation
        const randomVariation = 0.8 + Math.random() * 0.4; // ±20%
        
        const aqi = Math.round(
            baseAQI * timeMultiplier * weekendMultiplier * randomVariation
        );
        
        data.push({
            timestamp,
            aqi: Math.max(0, Math.min(500, aqi)) // Clamp between 0-500
        });
    }

    return data;
};
