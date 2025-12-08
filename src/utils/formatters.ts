import { format, formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Helper to check if timestamp is valid (not 0, null, or before year 2000)
const isValidTimestamp = (timestamp: number): boolean => {
    return (timestamp ?? 0) > 946684800000; // Jan 1, 2000 in milliseconds
};

export const formatTimestamp = (timestamp: number): string => {
    // If timestamp is invalid, use current time
    const validTimestamp = isValidTimestamp(timestamp) ? timestamp : Date.now();

    // Convert timestamp to IST (Asia/Kolkata timezone)
    const date = new Date(validTimestamp);
    const istDate = toZonedTime(date, 'Asia/Kolkata');

    return format(istDate, 'MMM dd, yyyy, h:mm:ss a') + ' IST';
};

export const formatRelativeTime = (timestamp: number): string => {
    // If timestamp is invalid, use current time
    const validTimestamp = isValidTimestamp(timestamp) ? timestamp : Date.now();

    const date = new Date(validTimestamp);
    return formatDistanceToNow(date, { addSuffix: true });
};

export const formatTimeOnly = (timestamp: number): string => {
    // If timestamp is invalid, use current time
    const validTimestamp = isValidTimestamp(timestamp) ? timestamp : Date.now();

    const date = new Date(validTimestamp);
    const istDate = toZonedTime(date, 'Asia/Kolkata');
    return format(istDate, 'h:mm:ss a');
};

export const formatCoordinate = (coord: number, isLat: boolean): string => {
    const direction = isLat
        ? (coord >= 0 ? 'N' : 'S')
        : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
};
