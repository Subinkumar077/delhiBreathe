import { format, formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const formatTimestamp = (timestamp: number): string => {
    // Convert timestamp to IST (Asia/Kolkata timezone)
    const date = new Date(timestamp);
    const istDate = toZonedTime(date, 'Asia/Kolkata');

    return format(istDate, 'MMM dd, yyyy, h:mm:ss a') + ' IST';
};

export const formatRelativeTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
};

export const formatTimeOnly = (timestamp: number): string => {
    const date = new Date(timestamp);
    const istDate = toZonedTime(date, 'Asia/Kolkata');
    return format(istDate, 'h:mm:ss a');
};

export const formatCoordinate = (coord: number, isLat: boolean): string => {
    const direction = isLat
        ? (coord >= 0 ? 'N' : 'S')
        : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
};
