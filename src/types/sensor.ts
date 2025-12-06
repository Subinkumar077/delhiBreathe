export interface SensorReading {
    timestamp: number;
    aqi: number;
    aqiCategory: string;
    pm25: number;
    pm10: number;
    gas1_ppm: number; // CO
    gas2_ppm: number; // NO2
    gas3_ppm: number; // NH3
    lat: number;
    lon: number;
    sats: number;
}

export interface PollutantInfo {
    id: string;
    name: string;
    value: number;
    unit: string;
    icon: React.ElementType;
    color: string;
    description: string;
}
