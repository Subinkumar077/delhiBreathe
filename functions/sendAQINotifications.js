/**
 * Firebase Cloud Function to send AQI notifications
 * 
 * This function:
 * 1. Runs every hour (or on-demand)
 * 2. Fetches current AQI data
 * 3. Gets all users with notification preferences
 * 4. Sends notifications if AQI exceeds user thresholds
 * 
 * Deploy: firebase deploy --only functions:sendAQINotifications
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.database();
const messaging = admin.messaging();

/**
 * Scheduled function to check AQI and send notifications
 * Runs every hour
 */
exports.sendAQINotifications = functions.pubsub
  .schedule('every 1 hours')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    try {
      console.log('Starting AQI notification check...');

      // 1. Fetch current AQI data from your database
      const aqiSnapshot = await db.ref('aqi/current').once('value');
      const currentAQI = aqiSnapshot.val();

      if (!currentAQI) {
        console.log('No AQI data available');
        return null;
      }

      // 2. Get all users with notification preferences
      const usersSnapshot = await db.ref('users').once('value');
      const users = usersSnapshot.val();

      if (!users) {
        console.log('No users found');
        return null;
      }

      const notifications = [];

      // 3. Check each user's preferences and send notifications
      for (const [userId, userData] of Object.entries(users)) {
        const prefs = userData.notificationPreferences;
        
        if (!prefs) continue;

        // Check if current AQI exceeds user's threshold
        const shouldNotify = currentAQI.value >= prefs.aqiThreshold;

        if (shouldNotify) {
          // Send browser push notification
          if (prefs.browser && userData.notificationTokens) {
            const tokens = Object.keys(userData.notificationTokens);
            if (tokens.length > 0) {
              notifications.push(
                sendPushNotification(tokens, currentAQI, prefs.aqiThreshold)
              );
            }
          }

          // Send email notification
          if (prefs.email && userData.email) {
            notifications.push(
              sendEmailNotification(userData.email, currentAQI, prefs.aqiThreshold)
            );
          }

          // Send SMS notification
          if (prefs.sms && userData.phoneNumber) {
            notifications.push(
              sendSMSNotification(userData.phoneNumber, currentAQI, prefs.aqiThreshold)
            );
          }
        }
      }

      // Wait for all notifications to be sent
      await Promise.all(notifications);

      console.log(`Sent ${notifications.length} notifications`);
      return null;
    } catch (error) {
      console.error('Error sending AQI notifications:', error);
      return null;
    }
  });

/**
 * Send push notification via Firebase Cloud Messaging
 */
async function sendPushNotification(tokens, aqiData, threshold) {
  const message = {
    notification: {
      title: '⚠️ AQI Alert',
      body: `Air quality is ${getAQILevel(aqiData.value)}! Current AQI: ${aqiData.value} (Your threshold: ${threshold})`,
      icon: '/logo.png',
    },
    data: {
      aqi: String(aqiData.value),
      level: getAQILevel(aqiData.value),
      threshold: String(threshold),
      url: '/dashboard',
    },
    tokens: tokens,
  };

  try {
    const response = await messaging.sendMulticast(message);
    console.log(`Push notifications sent: ${response.successCount} success, ${response.failureCount} failed`);
    
    // Remove invalid tokens
    if (response.failureCount > 0) {
      const tokensToRemove = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          tokensToRemove.push(tokens[idx]);
        }
      });
      // TODO: Remove invalid tokens from database
    }
    
    return response;
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
}

/**
 * Send email notification
 * Note: Requires email service setup (SendGrid, AWS SES, etc.)
 */
async function sendEmailNotification(email, aqiData, threshold) {
  // TODO: Implement email sending
  // Example using SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: email,
    from: 'alerts@delhibreathe.com',
    subject: '⚠️ AQI Alert - Air Quality Warning',
    html: `
      <h2>Air Quality Alert</h2>
      <p>The air quality has exceeded your threshold!</p>
      <p><strong>Current AQI:</strong> ${aqiData.value}</p>
      <p><strong>Level:</strong> ${getAQILevel(aqiData.value)}</p>
      <p><strong>Your Threshold:</strong> ${threshold}</p>
      <p><a href="https://delhibreathe.web.app/dashboard">View Dashboard</a></p>
    `,
  };
  
  await sgMail.send(msg);
  */
  
  console.log(`Email notification would be sent to: ${email}`);
  return Promise.resolve();
}

/**
 * Send SMS notification
 * Note: Requires SMS service setup (Twilio, AWS SNS, etc.)
 */
async function sendSMSNotification(phoneNumber, aqiData, threshold) {
  // TODO: Implement SMS sending
  // Example using Twilio:
  /*
  const twilio = require('twilio');
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  
  await client.messages.create({
    body: `⚠️ AQI Alert: Air quality is ${getAQILevel(aqiData.value)}! Current AQI: ${aqiData.value}. View details: https://delhibreathe.web.app`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
  */
  
  console.log(`SMS notification would be sent to: ${phoneNumber}`);
  return Promise.resolve();
}

/**
 * Get AQI level description
 */
function getAQILevel(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

/**
 * HTTP function to manually trigger notifications (for testing)
 * Call: https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/triggerAQINotifications
 */
exports.triggerAQINotifications = functions.https.onRequest(async (req, res) => {
  try {
    await exports.sendAQINotifications.run();
    res.status(200).send('Notifications sent successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error sending notifications');
  }
});
