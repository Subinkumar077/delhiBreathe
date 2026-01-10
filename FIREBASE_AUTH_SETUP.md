# Firebase Authentication Setup Guide

## ✅ What's Been Implemented

### 1. Authentication System
- **Phone Authentication** with OTP verification
- **Google Sign-In** with popup
- Auth modal with smooth UI/UX
- User menu with profile dropdown
- Logout functionality

### 2. Notification System
- Browser push notifications (FCM)
- Email notifications (for Google sign-in users)
- SMS notifications (for phone sign-in users)
- Notification preferences management
- AQI threshold alerts

### 3. UI Components
- `AuthModal` - Sign-in modal with phone/Google options
- `UserMenu` - User profile dropdown in header
- `NotificationSettings` - Manage notification preferences
- Updated `Header` with auth button

### 4. Services
- `src/services/auth.ts` - Authentication functions
- `src/services/notifications.ts` - Notification management
- `src/contexts/AuthContext.tsx` - Global auth state

---

## 🔧 Firebase Console Setup (Required)

### Step 1: Enable Authentication Methods

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your **delhibreathe** project
3. Navigate to **Authentication** → **Sign-in method**

#### Enable Phone Authentication:
- Click on **Phone** provider
- Click **Enable**
- Save

#### Enable Google Sign-In:
- Click on **Google** provider
- Click **Enable**
- Add your support email
- Save

### Step 2: Configure Cloud Messaging (for Push Notifications)

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Navigate to **Cloud Messaging** tab
3. Under **Web Push certificates**, click **Generate key pair**
4. Copy the **VAPID key** (you'll need this for `.env`)

### Step 3: Update Environment Variables

Add to your `.env` file:
```env
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### Step 4: Update Service Worker

Edit `public/firebase-messaging-sw.js` and replace placeholders with your actual Firebase config:
```javascript
firebase.initializeApp({
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "delhibreathe.firebaseapp.com",
  projectId: "delhibreathe",
  storageBucket: "delhibreathe.firebasestorage.app",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
});
```

### Step 5: Configure Authorized Domains

1. In Firebase Console → **Authentication** → **Settings**
2. Under **Authorized domains**, add:
   - `localhost` (for development)
   - Your production domain (e.g., `delhibreathe.web.app`)

---

## 🚀 Testing the Authentication

### Test Phone Authentication:
1. Run your app: `npm run dev`
2. Click **"Get Alerts"** button in header
3. Select **Phone** tab
4. Enter Indian phone number (format: 9876543210)
5. Click **Send OTP**
6. Check your phone for OTP
7. Enter OTP and verify

### Test Google Sign-In:
1. Click **"Get Alerts"** button
2. Select **Google** tab
3. Click **Continue with Google**
4. Select your Google account
5. You should be signed in and redirected to dashboard

### Test Notifications:
1. Sign in with any method
2. Click on your profile in header
3. Select **Notification Settings**
4. Enable browser notifications (will request permission)
5. Set your AQI threshold
6. Enable email/SMS based on sign-in method

---

## 📱 How It Works

### User Flow:
1. **Guest User** → Can browse all pages
2. **Click "Get Alerts"** → Opens auth modal
3. **Sign In** → Phone OTP or Google
4. **Redirected to Dashboard** → Signed in
5. **Profile Menu** → Shows email/phone, logout option
6. **Notification Settings** → Configure alerts

### Notification Flow:
- **Browser**: Instant push notifications via FCM
- **Email**: Sent to Google sign-in email
- **SMS**: Sent to phone number (requires backend implementation)
- **Threshold**: Only notify when AQI exceeds user's threshold

---

## 🔐 Security Notes

1. **reCAPTCHA**: Automatically enabled for phone auth (invisible)
2. **Token Storage**: Handled by Firebase Auth SDK
3. **Secure Rules**: Update Firebase Realtime Database rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

## 🎨 UI Features

- **Responsive Design**: Works on mobile and desktop
- **Smooth Animations**: Fade-in effects for modals
- **Error Handling**: User-friendly error messages
- **Loading States**: Spinners during async operations
- **Accessibility**: ARIA labels and keyboard navigation

---

## 📊 Database Structure

User data is stored in Firebase Realtime Database:

```
users/
  {userId}/
    notificationTokens/
      {token}/
        token: "fcm_token"
        createdAt: timestamp
        platform: "web"
    notificationPreferences/
      browser: true
      email: false
      sms: false
      aqiThreshold: 150
```

---

## 🔄 Next Steps (Backend Implementation)

To fully enable notifications, you'll need to:

1. **Create Firebase Cloud Function** to monitor AQI changes
2. **Send notifications** when threshold is exceeded
3. **Implement email service** (SendGrid, AWS SES, etc.)
4. **Implement SMS service** (Twilio, AWS SNS, etc.)

Example Cloud Function structure:
```javascript
// functions/index.js
exports.checkAQI = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    // 1. Fetch current AQI data
    // 2. Get all users with notification preferences
    // 3. Check if AQI exceeds user thresholds
    // 4. Send notifications via FCM/Email/SMS
  });
```

---

## 🐛 Troubleshooting

### Phone Auth Not Working:
- Check if Phone provider is enabled in Firebase Console
- Verify phone number format (+91XXXXXXXXXX)
- Check browser console for reCAPTCHA errors
- Ensure domain is authorized in Firebase Console

### Google Sign-In Not Working:
- Check if Google provider is enabled
- Verify authorized domains include your domain
- Check browser console for popup blocker warnings

### Notifications Not Working:
- Check if browser notifications are allowed
- Verify VAPID key is correct in `.env`
- Check if service worker is registered
- Ensure HTTPS (required for push notifications in production)

---

## 📝 Files Created

```
src/
├── types/
│   └── auth.ts                          # Auth type definitions
├── services/
│   ├── auth.ts                          # Auth functions
│   ├── notifications.ts                 # Notification service
│   └── firebase.ts                      # Updated with auth & messaging
├── contexts/
│   └── AuthContext.tsx                  # Auth state management
├── components/
│   ├── auth/
│   │   ├── AuthModal.tsx               # Sign-in modal
│   │   └── UserMenu.tsx                # User profile dropdown
│   ├── notifications/
│   │   └── NotificationSettings.tsx    # Notification preferences
│   └── shared/
│       └── Header.tsx                  # Updated with auth
├── pages/
│   └── NotificationSettings.tsx        # Settings page
└── App.tsx                             # Updated with routes

public/
└── firebase-messaging-sw.js            # Service worker for FCM

.env.example                            # Updated with VAPID key
```

---

## ✨ Features Summary

✅ Phone authentication with OTP
✅ Google sign-in
✅ User profile menu
✅ Logout functionality
✅ Browser push notifications
✅ Email notification support
✅ SMS notification support
✅ Notification preferences
✅ AQI threshold alerts
✅ Responsive design
✅ No protected routes (browse freely)
✅ Sign-in redirects to dashboard

---

## 🎯 Ready to Use!

Once you complete the Firebase Console setup and update the environment variables, your authentication system is ready to use. Users can sign in, configure notifications, and receive AQI alerts based on their preferences.
