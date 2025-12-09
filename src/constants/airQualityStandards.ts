// CPCB (Central Pollution Control Board) Air Quality Standards for India

export type AirQualityStatus = "Good" | "Satisfactory" | "Moderate" | "Poor" | "Very Poor" | "Severe" | "Hazardous" | "Unhealthy" | "Unknown";

export interface PollutantThreshold {
  min: number;
  max: number;
  status: AirQualityStatus;
  color: string;
  message: string;
}

export interface PollutantThresholds {
  [key: string]: PollutantThreshold[];
}

export const POLLUTANT_THRESHOLDS: PollutantThresholds = {
  PM2_5: [
    { min: 0, max: 30, status: "Good", color: "#2ECC71", message: "Air quality is excellent. Enjoy outdoor activities." },
    { min: 31, max: 60, status: "Satisfactory", color: "#A8E05F", message: "Air quality is acceptable for most people." },
    { min: 61, max: 90, status: "Moderate", color: "#F1C40F", message: "Sensitive individuals should limit prolonged outdoor exposure." },
    { min: 91, max: 120, status: "Poor", color: "#E67E22", message: "Everyone should reduce prolonged outdoor exertion." },
    { min: 121, max: 250, status: "Very Poor", color: "#E74C3C", message: "Avoid outdoor activities. Wear a mask if you must go out." },
    { min: 251, max: Infinity, status: "Severe", color: "#7E0023", message: "Health alert. Stay indoors and use air purifiers." }
  ],
  PM10: [
    { min: 0, max: 50, status: "Good", color: "#2ECC71", message: "Air quality is excellent. Enjoy outdoor activities." },
    { min: 51, max: 100, status: "Satisfactory", color: "#A8E05F", message: "Air quality is acceptable for most people." },
    { min: 101, max: 250, status: "Moderate", color: "#F1C40F", message: "Sensitive individuals should limit prolonged outdoor exposure." },
    { min: 251, max: 350, status: "Poor", color: "#E67E22", message: "Everyone should reduce prolonged outdoor exertion." },
    { min: 351, max: 430, status: "Very Poor", color: "#E74C3C", message: "Avoid outdoor activities. Wear a mask if you must go out." },
    { min: 431, max: Infinity, status: "Severe", color: "#7E0023", message: "Health alert. Stay indoors and use air purifiers." }
  ],
  CO: [
    { min: 0, max: 1, status: "Good", color: "#2ECC71", message: "Air quality is excellent. Enjoy outdoor activities." },
    { min: 1.1, max: 2, status: "Satisfactory", color: "#A8E05F", message: "Air quality is acceptable for most people." },
    { min: 2.1, max: 10, status: "Moderate", color: "#F1C40F", message: "Sensitive individuals should limit prolonged outdoor exposure." },
    { min: 10.1, max: 17, status: "Poor", color: "#E67E22", message: "Everyone should reduce prolonged outdoor exertion." },
    { min: 17.1, max: 34, status: "Very Poor", color: "#E74C3C", message: "Avoid outdoor activities. Wear a mask if you must go out." },
    { min: 34.1, max: Infinity, status: "Severe", color: "#7E0023", message: "Health alert. Stay indoors and use air purifiers." }
  ],
  NO2: [
    { min: 0, max: 40, status: "Good", color: "#2ECC71", message: "Air quality is excellent. Enjoy outdoor activities." },
    { min: 41, max: 80, status: "Satisfactory", color: "#A8E05F", message: "Air quality is acceptable for most people." },
    { min: 81, max: 180, status: "Moderate", color: "#F1C40F", message: "Sensitive individuals should limit prolonged outdoor exposure." },
    { min: 181, max: 280, status: "Poor", color: "#E67E22", message: "Everyone should reduce prolonged outdoor exertion." },
    { min: 281, max: 400, status: "Very Poor", color: "#E74C3C", message: "Avoid outdoor activities. Wear a mask if you must go out." },
    { min: 401, max: Infinity, status: "Severe", color: "#7E0023", message: "Health alert. Stay indoors and use air purifiers." }
  ],
  SO2: [
    { min: 0, max: 40, status: "Good", color: "#2ECC71", message: "Air quality is excellent. Enjoy outdoor activities." },
    { min: 41, max: 80, status: "Satisfactory", color: "#A8E05F", message: "Air quality is acceptable for most people." },
    { min: 81, max: 380, status: "Moderate", color: "#F1C40F", message: "Sensitive individuals should limit prolonged outdoor exposure." },
    { min: 381, max: 800, status: "Poor", color: "#E67E22", message: "Everyone should reduce prolonged outdoor exertion." },
    { min: 801, max: 1600, status: "Very Poor", color: "#E74C3C", message: "Avoid outdoor activities. Wear a mask if you must go out." },
    { min: 1601, max: Infinity, status: "Severe", color: "#7E0023", message: "Health alert. Stay indoors and use air purifiers." }
  ],
  VOCs: [
    { min: 0, max: 220, status: "Good", color: "#2ECC71", message: "Air quality is excellent. Enjoy outdoor activities." },
    { min: 220, max: 660, status: "Moderate", color: "#F1C40F", message: "Sensitive individuals should limit prolonged outdoor exposure." },
    { min: 660, max: Infinity, status: "Unhealthy", color: "#E74C3C", message: "Avoid outdoor activities. Wear a mask if you must go out." }
  ]
};

export interface PollutantStatusResult {
  status: AirQualityStatus;
  color: string;
  message: string;
}

/**
 * Get the air quality status for a given pollutant type and value
 * @param type - Pollutant type (PM2_5, PM10, CO, NO2, SO2, VOCs)
 * @param value - Measured value of the pollutant
 * @returns Object containing status, color, and health message
 */
export function getPollutantStatus(type: string, value: number): PollutantStatusResult {
  // Handle edge cases
  if (value < 0 || isNaN(value)) {
    return {
      status: "Unknown",
      color: "#95A5A6",
      message: "Invalid or unavailable data."
    };
  }

  // Normalize pollutant type (handle variations like PM2.5, pm2.5, etc.)
  const normalizedType = type.toUpperCase().replace(".", "_");
  
  const thresholds = POLLUTANT_THRESHOLDS[normalizedType];
  
  if (!thresholds) {
    return {
      status: "Unknown",
      color: "#95A5A6",
      message: "Pollutant type not recognized."
    };
  }

  // Find the appropriate threshold
  for (const threshold of thresholds) {
    if (value >= threshold.min && value <= threshold.max) {
      return {
        status: threshold.status,
        color: threshold.color,
        message: threshold.message
      };
    }
  }

  // Fallback (should not reach here if thresholds are properly defined)
  return {
    status: "Unknown",
    color: "#95A5A6",
    message: "Unable to determine air quality status."
  };
}

export interface PollutantInfo {
  name: string;
  unit: string;
  source: string;
  healthImpact: string;
}

export const POLLUTANT_INFO: { [key: string]: PollutantInfo } = {
  PM2_5: {
    name: "PM2.5",
    unit: "µg/m³",
    source: "Vehicle emissions, industrial processes, construction dust, and biomass burning.",
    healthImpact: "Fine particles that penetrate deep into lungs, causing respiratory and cardiovascular issues."
  },
  PM10: {
    name: "PM10",
    unit: "µg/m³",
    source: "Road dust, construction activities, industrial emissions, and natural sources like pollen.",
    healthImpact: "Coarse particles that can irritate airways and aggravate respiratory conditions."
  },
  CO: {
    name: "Carbon Monoxide",
    unit: "mg/m³",
    source: "Incomplete combustion of fossil fuels in vehicles, industrial processes, and heating systems.",
    healthImpact: "Reduces oxygen delivery to organs and tissues, causing headaches and dizziness at high levels."
  },
  NO2: {
    name: "Nitrogen Dioxide",
    unit: "µg/m³",
    source: "Vehicle exhaust, power plants, industrial facilities, and combustion processes.",
    healthImpact: "Irritates airways, reduces lung function, and increases susceptibility to respiratory infections."
  },
  SO2: {
    name: "Sulfur Dioxide",
    unit: "µg/m³",
    source: "Coal and oil combustion in power plants, industrial processes, and volcanic emissions.",
    healthImpact: "Causes breathing difficulties, especially for people with asthma and respiratory diseases."
  },
  VOCs: {
    name: "Volatile Organic Compounds",
    unit: "ppb",
    source: "Paints, solvents, vehicle emissions, industrial processes, and household products.",
    healthImpact: "Can cause eye, nose, and throat irritation, and some VOCs are carcinogenic."
  }
};

/**
 * Get simplified status for mapping to basic categories
 * @param status - Detailed air quality status
 * @returns Simplified status category
 */
export function getSimplifiedStatus(status: AirQualityStatus): "Good" | "Moderate" | "Poor" | "Hazardous" {
  switch (status) {
    case "Good":
    case "Satisfactory":
      return "Good";
    case "Moderate":
      return "Moderate";
    case "Poor":
    case "Unhealthy":
      return "Poor";
    case "Very Poor":
    case "Severe":
    case "Hazardous":
      return "Hazardous";
    default:
      return "Moderate";
  }
}
