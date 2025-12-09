import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../../services/firebase';
import { ShoppingCart } from 'lucide-react';

const MAX_FILTER_LIFE_HOURS = 3000;

export default function FilterLifeCard() {
    const [usageHours, setUsageHours] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    useEffect(() => {
        const filterRef = ref(database, 'system_status/filter_usage_hours');

        const unsubscribe = onValue(filterRef, (snapshot) => {
            const val = snapshot.val();
            setUsageHours(val || 0);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleReset = async () => {
        try {
            const filterRef = ref(database, 'system_status/filter_usage_hours');
            await set(filterRef, 0);
            setShowResetConfirm(false);
        } catch (error) {
            console.error("Failed to reset filter:", error);
        }
    };

    if (loading) return null;

    const currentUsage = usageHours || 0;
    const percentageRemaining = Math.max(0, 100 - ((currentUsage / MAX_FILTER_LIFE_HOURS) * 100));

    // Calculate days left (Assuming constant usage of 12h/day)
    const hoursLeft = Math.max(MAX_FILTER_LIFE_HOURS - currentUsage, 0);
    const daysLeft = Math.ceil(hoursLeft / 12); // 12 hours per day usage

    // Determine color based on percentage
    let barColor = "#2ECC71"; // Green
    let bgColor = "bg-green-50";
    let textColor = "text-green-700";
    
    if (percentageRemaining < 25) {
        barColor = "#E74C3C"; // Red
        bgColor = "bg-red-50";
        textColor = "text-red-700";
    } else if (percentageRemaining < 50) {
        barColor = "#F1C40F"; // Yellow
        bgColor = "bg-yellow-50";
        textColor = "text-yellow-700";
    }

    return (
        <div className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden" style={{ height: '165px' }}>
            {/* Header */}
            <div className="text-center mb-2">
                <h3 className="text-gray-500 font-semibold text-[10px] tracking-wider uppercase">HEPA Filter Health</h3>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center">
                {/* Percentage and Progress Bar Combined */}
                <div className="mb-2">
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                        <span className="text-2xl font-bold text-gray-800">{percentageRemaining.toFixed(0)}</span>
                        <span className="text-sm font-medium text-gray-500">%</span>
                    </div>
                    
                    {/* Horizontal Progress Bar */}
                    <div className="w-full px-2">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full transition-all duration-1000 ease-out rounded-full"
                                style={{
                                    width: `${percentageRemaining}%`,
                                    backgroundColor: barColor
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Days Left Display */}
                <div className={`text-center py-1.5 rounded-lg ${bgColor} mx-2 mb-2`}>
                    <div className={`text-base font-bold ${textColor} leading-none`}>{daysLeft}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">Days Remaining</div>
                </div>
            </div>

            {/* Button Area */}
            <div className="w-full">
                {!showResetConfirm ? (
                    percentageRemaining < 10 ? (
                        <button className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors text-[10px]">
                            <ShoppingCart size={12} />
                            Order Replacement
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg font-medium text-[10px] transition-colors"
                        >
                            Reset Counter
                        </button>
                    )
                ) : (
                    <div className="flex gap-1.5 animate-fade-in">
                        <button 
                            onClick={() => setShowResetConfirm(false)} 
                            className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-[10px] font-semibold text-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleReset} 
                            className="flex-1 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-semibold transition-colors"
                        >
                            Confirm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
