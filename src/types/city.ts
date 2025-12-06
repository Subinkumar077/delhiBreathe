export interface CityData {
    id: string;
    name: string;
    currentAqi: number;
    aqiCategory: string;
    history: {
        time: string; // HH:00
        aqi: number;
    }[];
}

export const CITIES_LIST = [
    'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];
