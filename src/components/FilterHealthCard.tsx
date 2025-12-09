import React, { useState, useEffect } from 'react';
import { calculateFilterLife } from '../utils/predictLife';
import type { PredictionResult } from '../utils/predictLife';

// 1. Define the Props Interface
interface FilterHealthCardProps {
  currentUsage: number; // We explicitly say this MUST be a number
}

const FilterHealthCard: React.FC<FilterHealthCardProps> = ({ currentUsage }) => {
  // 2. Tell State that it will hold our PredictionResult or null
  const [healthData, setHealthData] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const result = calculateFilterLife(currentUsage);
    setHealthData(result);
  }, [currentUsage]);

  if (!healthData) return <div>Loading prediction...</div>;

  return (
    <div style={styles.card}>
      <h3 style={styles.header}>HEPA Filter Life (Delhi Mode)</h3>
      
      <div style={styles.progressContainer}>
        <div style={{...styles.progressBar, width: `${healthData.percentage}%`}}></div>
      </div>
      <p style={styles.percentText}>{healthData.percentage}% Remaining</p>

      <div style={styles.infoBox}>
        <p><strong>⏳ Days Remaining:</strong> {healthData.daysLeft} days</p>
        <p><strong>📅 Replacement Date:</strong> {healthData.estimatedDate}</p>
      </div>

      <p style={styles.note}>*Prediction based on 5-year historical pollution trends.</p>
    </div>
  );
};

// CSS styles in JS (Typescript doesn't strictly check CSS objects by default, this is fine)
const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  header: { margin: '0 0 15px 0', color: '#333' },
  progressContainer: {
    width: '100%',
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50', 
    transition: 'width 0.5s ease'
  },
  percentText: { textAlign: 'right', fontWeight: 'bold', margin: '5px 0' },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px'
  },
  note: { fontSize: '12px', color: '#777', marginTop: '10px' }
};

export default FilterHealthCard;