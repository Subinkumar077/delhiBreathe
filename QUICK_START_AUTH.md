# 🚀 Quick Start - Firebase Authentication

## ⚡ 3-Minute Setup

### 1. Firebase Console (2 minutes)
```
1. Go to: https://console.firebase.google.com
2. Select: delhibreathe project
3. Click: Authentication → Sign-in method
4. Enable: Phone ✓
5. Enable: Google ✓
6. Go to: Project Settings → Cloud Messaging
7. Click: Generate key pair (under Web Push certificates)
8. Copy: VAPID key
```

### 2. Update .env File (30 seconds)
```env
# Add this line to your .env file:
VITE_FIREBASE_VAPID_KEY=BNdJ7... (paste your VAPID key)
```

### 3. Update Service Worker (30 seconds)
Edit `public/firebase-messaging-sw.js`:
- Replace `YOUR_API_KEY` with your actual Firebase API key
- Replace `YOUR_AUTH_DOMAIN` with `delhibreathe.firebaseapp.com`
- Replace `YOUR_PROJECT_ID` with `delhibreathe`
- Replace other placeholders with values from your `.env` file

### 4. Test It! (1 minute)
```bash
npm run dev
```

Click **"Get Alerts"** button in header → Sign in with Phone or Google!

---

## 🎯 What You Get

### For Users:
- ✅ Sign in with Phone (OTP)
- ✅ Sign in with Google
- ✅ Browser push notifications
- ✅ Email notifications (Google users)
- ✅ SMS notifications (Phone users)
- ✅ Custom AQI threshold alerts
- ✅ Profile menu with logout

### For You:
- ✅ Complete auth system
- ✅ User state management
- ✅ Notification preferences storage
- ✅ Responsive UI components
- ✅ No protected routes (browse freely)
- ✅ Auto-redirect to dashboard after sign-in

---

## 📍 Key Files

| File | Purpose |
|------|---------|
| `src/components/auth/AuthModal.tsx` | Sign-in modal |
| `src/components/auth/UserMenu.tsx` | User profile dropdown |
| `src/components/shared/Header.tsx` | "Get Alerts" button |
| `src/pages/NotificationSettings.tsx` | Notification preferences |
| `src/contexts/AuthContext.tsx` | Auth state |
| `src/services/auth.ts` | Auth functions |
| `src/services/notifications.ts` | Notification logic |

---

## 🔍 Testing Checklist

- [ ] Phone auth sends OTP
- [ ] OTP verification works
- [ ] Google sign-in opens popup
- [ ] User redirected to /dashboard after sign-in
- [ ] Profile menu shows email/phone
- [ ] Logout works
- [ ] Notification settings page loads
- [ ] Browser notification permission requested
- [ ] Preferences saved to Firebase

---

## 🆘 Quick Fixes

**Phone auth not working?**
→ Check Firebase Console → Authentication → Phone is enabled

**Google sign-in not working?**
→ Check Firebase Console → Authentication → Google is enabled

**Notifications not working?**
→ Check VAPID key in `.env` file

**Service worker errors?**
→ Update `public/firebase-messaging-sw.js` with real config values

---

## 📞 Support

For detailed setup instructions, see: `FIREBASE_AUTH_SETUP.md`

For Firebase Console: https://console.firebase.google.com
