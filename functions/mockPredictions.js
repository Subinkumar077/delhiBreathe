/**
 * Mock AQI Prediction Service
 * This provides realistic predictions without requiring Python/ML
 * Replace with real ML predictions once Python system is set up
 */

function getAQICategory(aqi) {
    if (aqi <= 50) return { category: 'Good', color: '#00e400', description: 'Air quality is satisfactory' };
    if (aqi <= 100) return { category: 'Moderate', color: '#ffff00', description: 'Air quality is acceptable' };
    if (aqi <= 150) return { category: 'Unhealthy for Sensitive Groups', color: '#ff7e00', description: 'Sensitive groups may experience health effects' };
    if (aqi <= 200) return { category: 'Unhealthy', color: '#ff0000', description: 'Everyone may begin to experience health effects' };
    if (aqi <= 300) return { category: 'Very Unhealthy', color: '#8f3f97', description: 'Health alert: everyone may experience serious effects' };
    return { category: 'Hazardous', color: '#7e0023', description: 'Health warnings of emergency conditions' };
}

function generateRealisticAQI(baseAQI, dayOffset, variance = 15) {
    // Add some realistic patterns
    const seasonalEffect = Math.sin(dayOffset / 7) * 10; // Weekly pattern
    const randomNoise = (Math.random() - 0.5) * variance;
    const trendEffect = dayOffset * -0.5; // Slight improvement over time
    
    const aqi = Math.max(0, Math.min(500, baseAQI + seasonalEffect + randomNoise + trendEffect));
    return Math.round(aqi * 10) / 10;
}

function generateDailyPredictions(currentAQI, days = 7) {
    const predictions = [];
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

function generateWeeklyPredictions(currentAQI, weeks = 4) {
    const predictions = [];
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

function generateMonthlyPredictions(currentAQI, months = 3) {
    const predictions = [];
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

async function getMockPredictions(database) {
    try {
        // Get current AQI from database
        const snapshot = await database.ref('/').once('value');
        const data = snapshot.val();
        const currentAQI = data?.aqi || 150; // Default to 150 if not available
        
        return {
            success: true,
            timestamp: new Date().toISOString(),
            predictions: {
                daily: generateDailyPredictions(currentAQI, 7),
                weekly: generateWeeklyPredictions(currentAQI, 4),
                monthly: generateMonthlyPredictions(currentAQI, 3)
            },
            note: 'Mock predictions - Replace with ML model once Python system is set up'
        };
    } catch (error) {
        console.error('Error generating mock predictions:', error);
        throw error;
    }
}

module.exports = { getMockPredictions };
