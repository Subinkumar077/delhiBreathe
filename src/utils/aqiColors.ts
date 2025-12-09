export const getAqiColor = (aqi: number): string => {
    if (aqi <= 50) return '#00E400';      // Good
    if (aqi <= 100) return '#FFFF00';     // Moderate
    if (aqi <= 150) return '#FF7E00';     // Poor (Unhealthy for Sensitive Groups)
    if (aqi <= 200) return '#ba4444';     // Unhealthy
    if (aqi <= 300) return '#8F3F97';     // Severe (Very Unhealthy)
    return '#FF0000';                      // Hazardous
};

export const getAqiCategory = (aqi: number): string => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Poor';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Severe';
    return 'Hazardous';
};

export const getAqiGradient = (aqi: number): string => {
    // Enhanced gradients with multiple color stops for better visual appeal
    if (aqi <= 50) {
        // Good - Green gradient
        return 'linear-gradient(135deg, #00E400 0%, #00B300 50%, #008F00 100%)';
    }
    if (aqi <= 100) {
        // Moderate - Yellow gradient
        return 'linear-gradient(135deg, #FFFF00 0%, #FFD700 50%, #FFA500 100%)';
    }
    if (aqi <= 150) {
        // Poor - Orange gradient
        return 'linear-gradient(135deg, #FF7E00 0%, #FF6B00 50%, #FF4500 100%)';
    }
    if (aqi <= 200) {
        // Unhealthy - Red/Pink gradient
        return 'linear-gradient(135deg, #E74C3C 0%, #C0392B 50%, #A93226 100%)';
    }
    if (aqi <= 300) {
        // Severe - Purple gradient
        return 'linear-gradient(135deg, #8F3F97 0%, #7D3C98 50%, #6C3483 100%)';
    }
    // Hazardous - Deep Red gradient (similar to pollutant cards)
    return 'linear-gradient(135deg, #FF0000 0%, #DC143C 30%, #C41E3A 60%, #8B0000 100%)';
};

export const getHealthMessage = (category: string): string => {
    const messages: Record<string, string> = {
        'Good': 'Air quality is satisfactory, and air pollution poses little or no risk.',
        'Moderate': 'Air quality is acceptable. However, there may be a risk for some people.',
        'Poor': 'Members of sensitive groups may experience health effects.',
        'Unhealthy': 'Some members of the general public may experience health effects.',
        'Severe': 'Health alert: The risk of health effects is increased for everyone.',
        'Hazardous': 'Health warning of emergency conditions: everyone is more likely to be affected.'
    };
    return messages[category] || 'No data available';
};
