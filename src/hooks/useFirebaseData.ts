import { useState, useEffect } from 'react';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { database } from '../services/firebase';
import type { SensorReading } from '../types/sensor';

export const useFirebaseData = () => {
    const [data, setData] = useState<SensorReading | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const readingsRef = ref(database, 'readings');
        const latestQuery = query(readingsRef, limitToLast(1));

        const unsubscribe = onValue(
            latestQuery,
            (snapshot) => {
                const val = snapshot.val();
                if (val) {
                    const latestKey = Object.keys(val)[0];
                    const latestReading = val[latestKey];
                    if (latestReading.timestamp === 0) {
                        latestReading.timestamp = Date.now();
                    }
                    setData(latestReading);
                    setConnected(true);
                    setLoading(false);
                } else {
                    // Handle empty data case if necessary
                    setLoading(false);
                }
            },
            (err) => {
                console.error("Firebase read error:", err);
                setError(err);
                setConnected(false);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { data, loading, error, connected };
};
