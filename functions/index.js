/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const { onValueCreated } = require("firebase-functions/v2/database");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

/**
 * Calculates filter wear when a new sensor reading is added.
 * Trigger: /readings/{pushId} (assuming this is where data goes, based on user context 'ref(/sensor_readings/{pushId})' - user said 'sensor_readings' in prompt but code context showed 'readings' in useFirebaseData.ts. usage in hook is 'readings'. I will use 'readings' to match the hook.)
 * 
 * Wait, the prompt said: "ref('/sensor_readings/{pushId}')" but `useFirebaseData.ts` uses `ref(database, 'readings')`.
 * I should probably double check this. 
 * `useFirebaseData.ts`: `const readingsRef = ref(database, 'readings');`
 * The user prompt might have been illustrative. I will use "readings" to match the actual code.
 */
exports.calculateFilterWear = onValueCreated("/readings/{pushId}", async (event) => {
    const snapshot = event.data;
    const reading = snapshot.val();

    if (!reading || !reading.timestamp) {
        logger.warn("Invalid reading data", reading);
        return;
    }

    try {
        // 1. Get the previous reading to calculate time elapsed
        // We order by timestamp and limit to 2 to get the current and the one before it
        // However, this is a trigger on a specific node. Querying the DB is cleaner.
        const readingsRef = admin.database().ref("readings");
        const lastReadingsQuery = readingsRef.orderByChild("timestamp").endBefore(reading.timestamp).limitToLast(1);

        const prevSnapshot = await lastReadingsQuery.once("value");
        let prevReading = null;

        prevSnapshot.forEach((child) => {
            prevReading = child.val();
        });

        if (!prevReading) {
            logger.info("No previous reading found. Skipping wear calculation for first reading.");
            return;
        }

        // 2. Calculate time elapsed in hours
        const timeDiffMs = reading.timestamp - prevReading.timestamp;
        // Sanity check: if diff is huge (e.g. > 24 hours) or negative, ignore or cap it.
        // Let's cap at 1 hour to prevent massive jumps if device was off.
        const hoursElapsed = Math.min(Math.max(timeDiffMs / (1000 * 60 * 60), 0), 1.0);

        // 3. Determine Factors
        // Speed Factor: User prompt says 1.0 Low, 1.5 Medium, 2.0 High.
        // We don't have speed in 'reading'. Default to Medium (1.5) as per plan.
        const speedFactor = reading.speed ? (
            reading.speed === 'Low' ? 1.0 :
                reading.speed === 'High' ? 2.0 : 1.5
        ) : 1.5;

        // AQI Factor: 1.0 if AQI < 50, else 2.0
        const aqiFactor = reading.aqi < 50 ? 1.0 : 2.0;

        // 4. Calculate Wear
        const wearAmount = hoursElapsed * speedFactor * aqiFactor;

        // 5. Transactional Update
        const filterRef = admin.database().ref("system_status/filter_usage_hours");

        await filterRef.transaction((currentParams) => {
            return (currentParams || 0) + wearAmount;
        });

        logger.info(`Filter wear updated: +${wearAmount.toFixed(4)} hours. (Elapsed: ${hoursElapsed.toFixed(2)}h, Speed: ${speedFactor}, AQI: ${reading.aqi})`);

    } catch (error) {
        logger.error("Error calculating filter wear:", error);
    }
});
