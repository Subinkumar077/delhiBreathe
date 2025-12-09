import { DELHI_MONTHLY_AVG, HEPA_MAX_CAPACITY } from './pollutionData';

// 1. Define the shape of the output object (The Interface)
export interface PredictionResult {
  daysLeft: number;
  percentage: string;
  estimatedDate: string;
}

// 2. Add types to arguments (: number) and return type (: PredictionResult)
export const calculateFilterLife = (currentUsage: number): PredictionResult => {
  let remainingCapacity = HEPA_MAX_CAPACITY - currentUsage;
  
  // Calculate Percentage
  let percentageVal = (remainingCapacity / HEPA_MAX_CAPACITY) * 100;
  percentageVal = Math.max(0, Math.min(100, percentageVal));

  let daysLeft = 0;
  let simulatedDate = new Date(); 

  while (remainingCapacity > 0) {
    const monthIndex = simulatedDate.getMonth();
    
    // TS might complain if monthIndex isn't found, so we force a fallback
    const expectedPollution = DELHI_MONTHLY_AVG[monthIndex] ?? 100;
    
    const dailyLoad = expectedPollution * 12 * 1.0; 
    
    remainingCapacity -= dailyLoad; 
    daysLeft++;
    simulatedDate.setDate(simulatedDate.getDate() + 1);

    if (daysLeft > 1825) break;
  }

  return {
    daysLeft: daysLeft,
    percentage: percentageVal.toFixed(1),
    estimatedDate: simulatedDate.toDateString()
  };
};