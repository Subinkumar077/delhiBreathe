import { useState, useEffect, useRef } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface DataPoint {
    timestamp: number;
    aqi: number;
}

interface AQIRealtimeMonitorProps {
    currentAQI: number;
}

export default function AQIRealtimeMonitor({ currentAQI }: AQIRealtimeMonitorProps) {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>(() => {
        const now = Date.now();
        const initialData: DataPoint[] = [];
        
        // Generate 60 data points (last 60 seconds)
        for (let i = 60; i >= 0; i--) {
            initialData.push({
                timestamp: now - (i * 1000),
                aqi: currentAQI + (Math.random() - 0.5) * 10
            });
        }
        
        return initialData;
    });
    const [previousAQI, setPreviousAQI] = useState<number>(currentAQI);
    const [change, setChange] = useState<number>(0);
    const [changePercent, setChangePercent] = useState<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);

    // Update data points when currentAQI changes
    useEffect(() => {
        const now = Date.now();
        
        setDataPoints(prev => {
            const newPoints = [...prev, { timestamp: now, aqi: currentAQI }];
            
            // Keep only last 60 seconds of data
            const cutoffTime = now - 60000;
            return newPoints.filter(point => point.timestamp > cutoffTime);
        });

        // Calculate change
        const aqiChange = currentAQI - previousAQI;
        const percentChange = previousAQI !== 0 ? (aqiChange / previousAQI) * 100 : 0;
        
        setChange(aqiChange);
        setChangePercent(percentChange);
        setPreviousAQI(currentAQI);
    }, [currentAQI, previousAQI]);

    // Draw the real-time graph
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dataPoints.length < 2) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            const graphWidth = width - padding * 2;
            const graphHeight = height - padding * 2;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Get min and max AQI for scaling
            const aqiValues = dataPoints.map(d => d.aqi);
            const minAQI = Math.min(...aqiValues) - 10;
            const maxAQI = Math.max(...aqiValues) + 10;
            const range = maxAQI - minAQI || 1;

            // Draw grid lines
            ctx.strokeStyle = '#E5E7EB';
            ctx.lineWidth = 1;
            
            for (let i = 0; i <= 5; i++) {
                const y = padding + (graphHeight / 5) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();

                // Draw Y-axis labels
                const aqiValue = Math.round(maxAQI - (range / 5) * i);
                ctx.fillStyle = '#6B7280';
                ctx.font = '11px sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(aqiValue.toString(), padding - 8, y + 4);
            }

            // Draw gradient fill under the line
            const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
            gradient.addColorStop(0, getAQIColor(currentAQI, 0.3));
            gradient.addColorStop(1, getAQIColor(currentAQI, 0.05));

            ctx.beginPath();
            dataPoints.forEach((point, index) => {
                const x = padding + (index / (dataPoints.length - 1)) * graphWidth;
                const y = height - padding - ((point.aqi - minAQI) / range) * graphHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.lineTo(width - padding, height - padding);
            ctx.lineTo(padding, height - padding);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw the main line
            ctx.beginPath();
            ctx.strokeStyle = getAQIColor(currentAQI, 1);
            ctx.lineWidth = 2.5;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            dataPoints.forEach((point, index) => {
                const x = padding + (index / (dataPoints.length - 1)) * graphWidth;
                const y = height - padding - ((point.aqi - minAQI) / range) * graphHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            // Draw current value indicator (pulsing dot)
            if (dataPoints.length > 0) {
                const lastPoint = dataPoints[dataPoints.length - 1];
                const x = width - padding;
                const y = height - padding - ((lastPoint.aqi - minAQI) / range) * graphHeight;

                // Outer glow
                const pulseRadius = 8 + Math.sin(Date.now() / 200) * 2;
                ctx.beginPath();
                ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
                ctx.fillStyle = getAQIColor(currentAQI, 0.3);
                ctx.fill();

                // Inner dot
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = getAQIColor(currentAQI, 1);
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [dataPoints, currentAQI]);

    const getAQIColor = (aqi: number, alpha: number = 1): string => {
        if (aqi <= 50) return `rgba(0, 228, 0, ${alpha})`;
        if (aqi <= 100) return `rgba(255, 255, 0, ${alpha})`;
        if (aqi <= 150) return `rgba(255, 126, 0, ${alpha})`;
        if (aqi <= 200) return `rgba(186, 68, 68, ${alpha})`;
        if (aqi <= 300) return `rgba(143, 63, 151, ${alpha})`;
        return `rgba(255, 0, 0, ${alpha})`;
    };

    const getAQIStatus = (aqi: number): string => {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Poor';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Severe';
        return 'Hazardous';
    };

    const getTrendIcon = () => {
        if (Math.abs(change) < 1) return <Minus className="w-5 h-5" />;
        if (change > 0) return <TrendingUp className="w-5 h-5" />;
        return <TrendingDown className="w-5 h-5" />;
    };

    const getTrendColor = () => {
        if (Math.abs(change) < 1) return 'text-gray-500 bg-gray-100';
        if (change > 0) return 'text-red-600 bg-red-100';
        return 'text-green-600 bg-green-100';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Real-Time AQI Monitor</h2>
                            <p className="text-sm text-blue-100">Live air quality tracking</p>
                        </div>
                    </div>
                    
                    {/* Live Indicator */}
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <div className="relative">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        </div>
                        <span className="text-xs font-semibold text-white">LIVE</span>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-gray-50 border-b border-gray-200">
                {/* Current AQI */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium mb-1">Current AQI</p>
                    <div className="flex items-center justify-center gap-2">
                        <span 
                            className="text-3xl font-bold"
                            style={{ color: getAQIColor(currentAQI) }}
                        >
                            {currentAQI}
                        </span>
                        <span 
                            className="text-xs font-semibold px-2 py-1 rounded-md text-white"
                            style={{ backgroundColor: getAQIColor(currentAQI) }}
                        >
                            {getAQIStatus(currentAQI)}
                        </span>
                    </div>
                </div>

                {/* Change */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium mb-1">Change</p>
                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span className="text-lg font-bold">
                            {change > 0 ? '+' : ''}{change.toFixed(1)}
                        </span>
                    </div>
                </div>

                {/* Percentage Change */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium mb-1">% Change</p>
                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg ${getTrendColor()}`}>
                        <span className="text-lg font-bold">
                            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Graph */}
            <div className="p-5">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={300}
                        className="w-full h-auto"
                        style={{ maxHeight: '300px' }}
                    />
                    
                    {/* Time indicator */}
                    <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <span>60s ago</span>
                        <span className="font-medium text-gray-700">Time</span>
                        <span className="font-semibold text-gray-900">Now</span>
                    </div>
                </div>
            </div>

            {/* Alert Banner */}
            {currentAQI > 150 && (
                <div className="mx-5 mb-5 flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-orange-900">Air Quality Alert</p>
                        <p className="text-xs text-orange-700 mt-1">
                            AQI levels are elevated. Consider limiting outdoor activities and using air purifiers indoors.
                        </p>
                    </div>
                </div>
            )}

            {/* Footer Info */}
            <div className="px-5 pb-5">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <p className="text-xs text-blue-900 font-medium">
                        📊 Monitoring updates every second • Data retention: 60 seconds
                    </p>
                </div>
            </div>
        </div>
    );
}
