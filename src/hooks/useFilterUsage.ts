import { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../services/firebase';

interface ReadingEntry {
    pm25?: number;
    fanSpeed?: number;
    duration?: number;
    filter_hours_used?: number;
    timestamp?: number;
}

export const useFilterUsage = () => {
    const [totalFilterLoad, setTotalFilterLoad] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const readingsRef = ref(database, 'readings');

        const unsubscribe = onValue(
            readingsRef,
            (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    setLoading(false);
                    return;
                }

                let totalDirt = 0;

                // Loop through every log entry
                Object.values(data).forEach((entry: any) => {
                    const reading = entry as ReadingEntry;
                    
                    // Safety check: ensure values exist
                    const pm = reading.pm25 || 0;
                    const speed = reading.fanSpeed || 1;
                    const duration = reading.duration || 0.25; // Assuming 15 mins (0.25 hrs) if missing

                    // The Formula: Pollution * Speed * Time
                    totalDirt += pm * speed * duration;
                });

                console.log('Total Filter Load:', totalDirt);
                setTotalFilterLoad(totalDirt);
                setLoading(false);
            },
            (error) => {
                console.error('Error reading filter usage:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const resetFilterUsage = async () => {
        try {
            const readingsRef = ref(database, 'readings');
            await remove(readingsRef);
            setTotalFilterLoad(0);
            console.log('Filter usage reset successfully');
        } catch (error) {
            console.error('Error resetting filter usage:', error);
            throw error;
        }
    };

    return { totalFilterLoad, loading, resetFilterUsage };
};
