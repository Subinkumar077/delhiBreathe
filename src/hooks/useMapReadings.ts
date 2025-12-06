import { useState, useEffect } from 'react';
import { ref, query, limitToLast, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import type { SensorReading } from '../types/sensor';

export const useMapReadings = () => {
    const [readings, setReadings] = useState<SensorReading[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const readingsRef = ref(database, 'readings');
        // Fetch last 100 readings to get a spread of data points
        // In a real app with many sensors, we'd query by location or active sensors
        const mapQuery = query(readingsRef, limitToLast(50));

        const unsubscribe = onValue(mapQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const readingsArray = Object.values(data) as SensorReading[];
                // Filter out invalid coordinates
                const validReadings = readingsArray.filter(r => r.lat !== 0 && r.lon !== 0);

                // rudimentary deduplication: keep latest reading for each approx location (to avoid stacking active sensor history)
                // using simple lat/lon toFixed(4) as key
                const uniqueParams = new Map();
                validReadings.forEach(r => {
                    const key = `${r.lat.toFixed(4)},${r.lon.toFixed(4)}`;
                    // We want the latest, and since we fetched limitToLast, the array might be in order, 
                    // but let's just overwrite entry to ensure we have one per location.
                    // (Assuming data comes in chronological order or we just take the last seen)
                    uniqueParams.set(key, r);
                });

                setReadings(Array.from(uniqueParams.values()));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { readings, loading };
};
