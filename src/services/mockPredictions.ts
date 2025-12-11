/**
 * Mock AQI Prediction Service (Client-side)
 * This provides realistic predictions without requiring backend/ML
 * Replace with real API call once Cloud Functions are deployed
 */

interface AQICategory {
    category: string;
    color: string;
    description: string;
}

interface Confidence {
    prediction: number;
    lower_bound: number;
    upper_bound: number;
}

interface DailyPrediction {
    date: string;
    day: string;
    aqi: number;
    confidence: Confidence;
    category: string;
    color: string;
    description: string;
}

interface WeeklyPrediction {
    week: number;
    start_date: string;
    end_date: string;
    aqi: number;
    confidence: Confidence;
    category: string;
    color: string;
    description: string;
}

interface MonthlyPrediction {
    month: string;
    year: number;
    aqi: number;
    confidence: Confidence;
    category: string;
    color: string;
    description: string;
}

interface PredictionsResponse {
    success: boolean;
    timestamp: string;
    predictions: {
        daily: DailyPrediction[];
        weekly: WeeklyPrediction[];
        monthly: MonthlyPrediction[];
    };
    note?: string;
}

function getAQICategory(aqi: number): AQICategory {
    if (aqi <= 50) return { category: 'Good', color: '#00e400', description: 'Air quality is satisfactory' };
    if (aqi <= 100) return { category: 'Moderate', color: '#ffff00', description: 'Air quality is acceptable' };
    if (aqi <= 150) return { category: 'Unhealthy for Sensitive Groups', color: '#ff7e00', description: 'Sensitive groups may experience health effects' };
    if (aqi <= 200) return { category: 'Unhealthy', color: '#ff0000', description: 'Everyone may begin to experience health effects' };
    if (aqi <= 300) return { category: 'Very Unhealthy', color: '#8f3f97', description: 'Health alert: everyone may experience serious effects' };
    return { category: 'Hazardous', color: '#7e0023', description: 'Health warnings of emergency conditions' };
}

function generateRealisticAQI(baseAQI: number, dayOffset: number, variance: number = 15): number {
    // Add realistic patterns
    const seasonalEffect = Math.sin(dayOffset / 7) * 10; // Weekly pattern
    const randomNoise = (Math.random() - 0.5) * variance;
    const trendEffect = dayOffset * -0.5; // Slight improvement over time
    
    const aqi = Math.max(0, Math.min(500, baseAQI + seasonalEffect + randomNoise + trendEffect));
    return Math.round(aqi * 10) / 10;
}

function generateDailyPredictions(currentAQI: number, days: number = 7): DailyPrediction[] {
    const predictions: DailyPrediction[] = [];
    const now = new Date();
    
    for (let i = 1; i <= days; i++) {
        const futureDate = new Date(now);
        futureDate.setDate(now.getDate() + i);
        
        const aqi = generateRealisticAQI(currentAQI, i, 15);
        const stdDev = 12;
        const category = getAQICategory(aqi);
        
        predictions.push({
            date: futureDate.toISOString().split('T')[0],
            day: futureDate.toLocaleDateString('en-US', { weekday: 'long' }),
            aqi: aqi,
            confidence: {
                prediction: aqi,
                lower_bound: Math.max(0, aqi - 1.96 * stdDev),
                upper_bound: Math.min(500, aqi + 1.96 * stdDev)
            },
            category: category.category,
            color: category.color,
            description: category.description
        });
    }
    
    return predictions;
}

function generateWeeklyPredictions(currentAQI: number, weeks: number = 4): WeeklyPrediction[] {
    const predictions: WeeklyPrediction[] = [];
    const now = new Date();
    
    for (let i = 1; i <= weeks; i++) {
        const startDate = new Date(now);
        startDate.setDate(now.getDate() + (i * 7));
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        
        const aqi = generateRealisticAQI(currentAQI, i * 7, 12);
        const stdDev = 10;
        const category = getAQICategory(aqi);
        
        predictions.push({
            week: i,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            aqi: aqi,
            confidence: {
                prediction: aqi,
                lower_bound: Math.max(0, aqi - 1.96 * stdDev),
                upper_bound: Math.min(500, aqi + 1.96 * stdDev)
            },
            category: category.category,
            color: category.color,
            description: category.description
        });
    }
    
    return predictions;
}

function generateMonthlyPredictions(currentAQI: number, months: number = 3): MonthlyPrediction[] {
    const predictions: MonthlyPrediction[] = [];
    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    for (let i = 1; i <= months; i++) {
        const futureDate = new Date(now);
        futureDate.setMonth(now.getMonth() + i);
        
        const aqi = generateRealisticAQI(currentAQI, i * 30, 10);
        const stdDev = 8;
        const category = getAQICategory(aqi);
        
        predictions.push({
            month: monthNames[futureDate.getMonth()],
            year: futureDate.getFullYear(),
            aqi: aqi,
            confidence: {
                prediction: aqi,
                lower_bound: Math.max(0, aqi - 1.96 * stdDev),
                upper_bound: Math.min(500, aqi + 1.96 * stdDev)
            },
            category: category.category,
            color: category.color,
            description: category.description
        });
    }
    
    return predictions;
}

export async function getMockPredictions(currentAQI: number): Promise<PredictionsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
        success: true,
        timestamp: new Date().toISOString(),
        predictions: {
            daily: generateDailyPredictions(currentAQI, 7),
            weekly: generateWeeklyPredictions(currentAQI, 4),
            monthly: generateMonthlyPredictions(currentAQI, 3)
        },
        note: 'Mock predictions - Using client-side generation until ML backend is deployed'
    };
}
