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
        
        // Generate 30 data points (last 30 minutes, one point per minute)
        for (let i = 30; i >= 0; i--) {
            initialData.push({
                timestamp: now - (i * 60000), // 60000ms = 1 minute
                aqi: currentAQI + (Math.random() - 0.5) * 15
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
            
            // Keep only last 30 minutes of data
            const cutoffTime = now - (30 * 60000); // 30 minutes
            return newPoints.filter(point => point.timestamp > cutoffTime);
        });

        // Calculate change
        const aqiChange = currentAQI - previousAQI;
        const percentChange = previousAQI !== 0 ? (aqiChange / previousAQI) * 100 : 0;
        
        setChange(aqiChange);
        setChangePercent(percentChange);
        setPreviousAQI(currentAQI);
    }, [currentAQI, previousAQI]);

    // Format time for x-axis labels
    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Draw the real-time graph
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dataPoints.length < 2) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;
            const paddingLeft = 50;
            const paddingRight = 20;
            const paddingTop = 30;
            const paddingBottom = 50;
            const graphWidth = width - paddingLeft - paddingRight;
            const graphHeight = height - paddingTop - paddingBottom;

            // Clear canvas with subtle background
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(0, 0, width, height);

            // Get min and max AQI for scaling
            const aqiValues = dataPoints.map(d => d.aqi);
            const minAQI = Math.floor(Math.min(...aqiValues) / 10) * 10 - 10;
            const maxAQI = Math.ceil(Math.max(...aqiValues) / 10) * 10 + 10;
            const range = maxAQI - minAQI || 1;

            // Draw horizontal grid lines
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            
            for (let i = 0; i <= 5; i++) {
                const y = paddingTop + (graphHeight / 5) * i;
                ctx.beginPath();
                ctx.moveTo(paddingLeft, y);
                ctx.lineTo(width - paddingRight, y);
                ctx.stroke();

                // Draw Y-axis labels
                const aqiValue = Math.round(maxAQI - (range / 5) * i);
                ctx.fillStyle = '#6b7280';
                ctx.font = '12px Inter, sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(aqiValue.toString(), paddingLeft - 10, y);
            }

            ctx.setLineDash([]);

            // Draw X-axis time labels (show 6 time points across 30 minutes)
            ctx.fillStyle = '#6b7280';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            const timeLabels = 6;
            for (let i = 0; i < timeLabels; i++) {
                const pointIndex = Math.floor((i / (timeLabels - 1)) * (dataPoints.length - 1));
                const point = dataPoints[pointIndex];
                const x = paddingLeft + (pointIndex / (dataPoints.length - 1)) * graphWidth;
                const y = height - paddingBottom + 10;
                
                ctx.fillText(formatTime(point.timestamp), x, y);
            }

            // Draw X-axis label
            ctx.fillStyle = '#374151';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Time (Last 30 Minutes)', width / 2, height - 10);

            // Draw Y-axis label
            ctx.save();
            ctx.translate(15, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = '#374151';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('AQI Value', 0, 0);
            ctx.restore();

            // Draw smooth gradient fill under the line
            const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
            gradient.addColorStop(0, getAQIColor(currentAQI, 0.15));
            gradient.addColorStop(1, getAQIColor(currentAQI, 0.02));

            ctx.beginPath();
            dataPoints.forEach((point, index) => {
                const x = paddingLeft + (index / (dataPoints.length - 1)) * graphWidth;
                const y = height - paddingBottom - ((point.aqi - minAQI) / range) * graphHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.lineTo(width - paddingRight, height - paddingBottom);
            ctx.lineTo(paddingLeft, height - paddingBottom);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw the main smooth line with environmental theme color
            ctx.beginPath();
            ctx.strokeStyle = getAQIColor(currentAQI, 0.9);
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.shadowColor = getAQIColor(currentAQI, 0.3);
            ctx.shadowBlur = 8;

            dataPoints.forEach((point, index) => {
                const x = paddingLeft + (index / (dataPoints.length - 1)) * graphWidth;
                const y = height - paddingBottom - ((point.aqi - minAQI) / range) * graphHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw data points as small circles
            dataPoints.forEach((point, index) => {
                const x = paddingLeft + (index / (dataPoints.length - 1)) * graphWidth;
                const y = height - paddingBottom - ((point.aqi - minAQI) / range) * graphHeight;
                
                // Only show every 5th point to avoid clutter
                if (index % 5 === 0 || index === dataPoints.length - 1) {
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();
                    ctx.strokeStyle = getAQIColor(currentAQI, 0.9);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });

            // Draw current value indicator (pulsing dot)
            if (dataPoints.length > 0) {
                const lastPoint = dataPoints[dataPoints.length - 1];
                const x = width - paddingRight;
                const y = height - paddingBottom - ((lastPoint.aqi - minAQI) / range) * graphHeight;

                // Outer glow (pulsing)
                const pulseRadius = 10 + Math.sin(Date.now() / 300) * 3;
                ctx.beginPath();
                ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
                ctx.fillStyle = getAQIColor(currentAQI, 0.2);
                ctx.fill();

                // Middle ring
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = getAQIColor(currentAQI, 0.5);
                ctx.fill();

                // Inner dot
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = getAQIColor(currentAQI, 1);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Real-Time AQI Monitor</h2>
                            <p className="text-sm text-white/90">Live air quality tracking - Last 30 minutes</p>
                        </div>
                    </div>
                    
                    {/* Live Indicator */}
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <div className="relative">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
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
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <canvas
                        ref={canvasRef}
                        width={900}
                        height={350}
                        className="w-full h-auto"
                        style={{ maxHeight: '350px' }}
                    />
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
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-green-900 font-medium">
                        📊 Real-time monitoring • Updates every minute • Displaying last 30 minutes of data
                    </p>
                </div>
            </div>
        </div>
    );
}
