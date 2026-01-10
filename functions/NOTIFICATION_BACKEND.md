# 🔔 AQI Notification Backend

## Overview

This Cloud Function automatically sends AQI notifications to users based on their preferences and threshold settings.

## Features

- ✅ **Scheduled Execution**: Runs every hour to check AQI levels
- ✅ **Browser Push Notifications**: Via Firebase Cloud Messaging (FCM)
- ✅ **Email Notifications**: For Google sign-in users (requires setup)
- ✅ **SMS Notifications**: For phone sign-in users (requires setup)
- ✅ **Threshold-based**: Only notifies when AQI exceeds user's threshold
- ✅ **Multi-user Support**: Handles all users with different preferences
- ✅ **Token Management**: Automatically removes invalid FCM tokens

## File Structure

```
functions/
├── index.js                      # Main exports (existing)
├── sendAQINotifications.js       # New notification function
├── package.json                  # Dependencies
└── NOTIFICATION_BACKEND.md       # This file
```

## Setup Instructions

### 1. Update functions/index.js

Add this line to export the notification function:

```javascript
// Add to functions/index.js
exports.sendAQINotifications = require('./sendAQINotifications').sendAQINotifications;
exports.triggerAQINotifications = require('./sendAQINotifications').triggerAQINotifications;
```

### 2. Install Dependencies (Optional for Email/SMS)

```bash
cd functions

# For email notifications (SendGrid)
npm install @sendgrid/mail

# For SMS notifications (Twilio)
npm install twilio

# For SMS via AWS SNS
npm install aws-sdk
```

### 3. Configure Environment Variables

```bash
# Set SendGrid API key (for email)
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"

# Set Twilio credentials (for SMS)
firebase functions:config:set twilio.sid="YOUR_TWILIO_ACCOUNT_SID"
firebase functions:config:set twilio.token="YOUR_TWILIO_AUTH_TOKEN"
firebase functions:config:set twilio.phone="+1234567890"
```

### 4. Deploy the Function

```bash
# Deploy only the notification function
firebase deploy --only functions:sendAQINotifications,functions:triggerAQINotifications

# Or deploy all functions
firebase deploy --only functions
```

## How It Works

### Scheduled Execution (Every Hour)

```
1. Function triggers every hour
2. Fetches current AQI data from database
3. Gets all users with notification preferences
4. For each user:
   - Check if AQI >= user's threshold
   - If yes, send notifications based on preferences:
     * Browser push (if enabled)
     * Email (if enabled and has email)
     * SMS (if enabled and has phone)
5. Logs results and cleans up invalid tokens
```

### Database Structure Expected

```
aqi/
  current/
    value: 175
    level: "Unhealthy"
    timestamp: 1234567890
    location: "Delhi"

users/
  {userId}/
    email: "user@example.com"
    phoneNumber: "+919876543210"
    notificationPreferences/
      browser: true
      email: true
      sms: false
      aqiThreshold: 150
    notificationTokens/
      {token1}/
        token: "fcm_token_string"
        createdAt: 1234567890
        platform: "web"
```

## Testing

### Test Manually via HTTP Trigger

```bash
# Get your function URL
firebase functions:config:get

# Call the trigger function
curl https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/triggerAQINotifications
```

### Test Locally with Emulator

```bash
# Start Firebase emulators
firebase emulators:start

# The function will run on schedule in the emulator
# Or trigger manually via the emulator UI
```

### Test with Firebase Console

1. Go to Firebase Console → Functions
2. Find `sendAQINotifications`
3. Click "View logs" to see execution history
4. Use Cloud Scheduler to trigger manually

## Email Setup (SendGrid)

### 1. Sign up for SendGrid
- Go to https://sendgrid.com
- Create account and verify email
- Get API key from Settings → API Keys

### 2. Update the function

Uncomment the SendGrid code in `sendEmailNotification()`:

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

const msg = {
  to: email,
  from: 'alerts@delhibreathe.com', // Use your verified sender
  subject: '⚠️ AQI Alert - Air Quality Warning',
  html: `...`
};

await sgMail.send(msg);
```

### 3. Verify sender email
- In SendGrid, verify your sender email
- Update `from` field with verified email

## SMS Setup (Twilio)

### 1. Sign up for Twilio
- Go to https://twilio.com
- Create account and get phone number
- Get Account SID and Auth Token

### 2. Update the function

Uncomment the Twilio code in `sendSMSNotification()`:

```javascript
const twilio = require('twilio');
const client = twilio(
  functions.config().twilio.sid,
  functions.config().twilio.token
);

await client.messages.create({
  body: `⚠️ AQI Alert: Air quality is ${getAQILevel(aqiData.value)}!`,
  from: functions.config().twilio.phone,
  to: phoneNumber,
});
```

## Alternative: AWS SNS for SMS

```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'ap-south-1' });

await sns.publish({
  Message: `⚠️ AQI Alert: Current AQI is ${aqiData.value}`,
  PhoneNumber: phoneNumber,
}).promise();
```

## Monitoring

### View Logs

```bash
# View recent logs
firebase functions:log

# View specific function logs
firebase functions:log --only sendAQINotifications

# Stream logs in real-time
firebase functions:log --follow
```

### Firebase Console

1. Go to Firebase Console → Functions
2. Click on function name
3. View:
   - Execution count
   - Error rate
   - Execution time
   - Logs

## Cost Estimation

### Firebase Cloud Functions
- **Free tier**: 2M invocations/month
- **Scheduled (hourly)**: ~720 invocations/month
- **Cost**: FREE (well within limits)

### Firebase Cloud Messaging (Push)
- **Free**: Unlimited notifications

### SendGrid (Email)
- **Free tier**: 100 emails/day
- **Cost**: FREE for most use cases

### Twilio (SMS)
- **Cost**: ~$0.0075 per SMS (India)
- **Example**: 100 users × 2 alerts/day = $1.50/day

## Optimization Tips

1. **Batch Notifications**: Group users by location
2. **Rate Limiting**: Don't send too frequently
3. **Smart Thresholds**: Only notify on significant changes
4. **User Preferences**: Respect quiet hours
5. **Token Cleanup**: Remove invalid tokens regularly

## Troubleshooting

### Function not triggering
- Check Cloud Scheduler in GCP Console
- Verify function is deployed: `firebase functions:list`
- Check logs: `firebase functions:log`

### Push notifications not working
- Verify FCM tokens are valid
- Check if tokens are stored in database
- Ensure VAPID key is configured

### Email not sending
- Verify SendGrid API key
- Check sender email is verified
- Review SendGrid activity logs

### SMS not sending
- Verify Twilio credentials
- Check phone number format (+91XXXXXXXXXX)
- Review Twilio console logs

## Security

### Database Rules

```json
{
  "rules": {
    "aqi": {
      ".read": true,
      ".write": false
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### Function Permissions

- Functions run with admin privileges
- Secure environment variables with Firebase config
- Never expose API keys in code

## Next Steps

1. ✅ Deploy the function
2. ✅ Test with manual trigger
3. ✅ Set up email service (optional)
4. ✅ Set up SMS service (optional)
5. ✅ Monitor logs and adjust
6. ✅ Add more notification types (in-app, etc.)

## Support

For issues or questions:
- Check Firebase Console logs
- Review function code comments
- Test with emulator first
- Check Firebase documentation

---

**Ready to deploy!** 🚀

```bash
firebase deploy --only functions:sendAQINotifications
```
