export const getAqiColor = (aqi: number): string => {
    if (aqi <= 50) return '#4CAF50';      // Good - Green
    if (aqi <= 100) return '#FFEB3B';     // Moderate - Yellow
    if (aqi <= 150) return '#FF9800';     // Poor - Orange
    if (aqi <= 200) return '#F44336';     // Unhealthy - Red
    if (aqi <= 300) return '#9C27B0';     // Severe - Purple
    return '#7B1FA2';                      // Hazardous - Dark Purple
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
    const color = getAqiColor(aqi);
    // Simple darkening for gradient effect
    return `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -20)} 100%)`;
};

// Helper to darken hex color
function adjustBrightness(col: string, amt: number) {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

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
