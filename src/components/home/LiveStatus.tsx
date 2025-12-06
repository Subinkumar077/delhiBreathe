import { Wifi, WifiOff } from 'lucide-react';
import clsx from 'clsx';

interface LiveStatusProps {
    connected: boolean;
    lastUpdate?: number;
}

export default function LiveStatus({ connected, lastUpdate }: LiveStatusProps) {
    return (
        <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <div className={clsx("relative flex items-center justify-center", connected ? "text-green-500" : "text-red-500")}>
                {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
                {connected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></span>
                )}
            </div>
            <span className={clsx("text-xs font-medium", connected ? "text-green-700" : "text-red-700")}>
                {connected ? "LIVE" : "OFFLINE"}
            </span>
            {lastUpdate && connected && (
                <span className="text-[10px] text-gray-500 border-l pl-2 ml-1">
                    {new Date(lastUpdate).toLocaleTimeString()}
                </span>
            )}
        </div>
    );
}
