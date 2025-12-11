import React, { useState, useEffect } from 'react';
import { calculateFilterLife } from '../../utils/predictLife';
import type { PredictionResult } from '../../utils/predictLife';
import { useFilterUsage } from '../../hooks/useFilterUsage';

const FilterHealthCard: React.FC = () => {
  const { totalFilterLoad, loading: loadingUsage } = useFilterUsage();
  const [healthData, setHealthData] = useState<PredictionResult | null>(null);

  useEffect(() => {
    if (totalFilterLoad > 0) {
      const result = calculateFilterLife(totalFilterLoad);
      setHealthData(result);
    } else {
      const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      setHealthData({
        percentage: '100.0',
        daysLeft: 365,
        estimatedDate: futureDate.toDateString()
      });
    }
  }, [totalFilterLoad]);

  if (loadingUsage || !healthData) {
    return (
      <div style={styles.card}>
        <div style={styles.loadingContainer}>
          <p>Loading filter data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.header}>HEPA Filter Life</h3>

      <div style={styles.progressContainer}>
        <div style={{ ...styles.progressBar, width: `${healthData.percentage}%` }}></div>
      </div>
      <p style={styles.percentText}>{healthData.percentage}% Remaining</p>

      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          <strong>Days Remaining:</strong> {healthData.daysLeft} days
        </p>
        <p style={styles.infoText}>
          <strong>Replacement Date:</strong> {healthData.estimatedDate}
        </p>
      </div>

      <p style={styles.note}>*Prediction based on real-time data and historical pollution trends.</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '24px',
    padding: '16px',
    height: '141px', // Matched with AQIHero (320px) - LocationCard (155px) - Gap (24px)
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    margin: '0',
    color: '#1f2937',
    fontSize: '14px',
    fontWeight: '600'
  },
  progressContainer: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '8px'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    transition: 'width 0.5s ease',
    borderRadius: '10px'
  },
  percentText: {
    textAlign: 'right',
    fontWeight: '600',
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#1f2937'
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    justifyContent: 'center'
  },
  infoText: {
    margin: '0',
    color: '#1f2937',
    fontSize: '11px'
  },
  note: {
    fontSize: '9px',
    color: '#9ca3af',
    margin: '0',
    lineHeight: '1.2'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: '#666',
    fontSize: '13px'
  }
};

export default FilterHealthCard;
