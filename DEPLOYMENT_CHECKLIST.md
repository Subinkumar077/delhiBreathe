# ✅ Deployment Checklist - Firebase Authentication

## Pre-Deployment Setup

### 1. Firebase Console Configuration
- [ ] Go to [Firebase Console](https://console.firebase.google.com)
- [ ] Select **delhibreathe** project
- [ ] Navigate to **Authentication** → **Sign-in method**
- [ ] Enable **Phone** authentication
- [ ] Enable **Google** authentication
- [ ] Add support email for Google sign-in
- [ ] Go to **Project Settings** → **Cloud Messaging**
- [ ] Generate **Web Push certificate** (VAPID key)
- [ ] Copy VAPID key for environment variables

### 2. Environment Variables
- [ ] Create/update `.env` file in project root
- [ ] Add all Firebase config variables (check `.env.example`)
- [ ] Add `VITE_FIREBASE_VAPID_KEY` with your VAPID key
- [ ] Verify all values are correct (no placeholders)
- [ ] **Never commit `.env` to git**

### 3. Service Worker Configuration
- [ ] Open `public/firebase-messaging-sw.js`
- [ ] Replace `YOUR_API_KEY` with actual API key
- [ ] Replace `YOUR_AUTH_DOMAIN` with `delhibreathe.firebaseapp.com`
- [ ] Replace `YOUR_PROJECT_ID` with `delhibreathe`
- [ ] Replace all other placeholders with real values
- [ ] Save the file

### 4. Authorized Domains
- [ ] Go to Firebase Console → **Authentication** → **Settings**
- [ ] Under **Authorized domains**, verify:
  - [ ] `localhost` (for development)
  - [ ] Your production domain (e.g., `delhibreathe.web.app`)
  - [ ] Any custom domains you use

### 5. Database Rules
- [ ] Go to Firebase Console → **Realtime Database** → **Rules**
- [ ] Update rules to secure user data:
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
- [ ] Publish rules

---

## Local Testing

### 6. Install Dependencies
```bash
# Frontend
npm install

# Backend (if deploying functions)
cd functions
npm install
cd ..
```

### 7. Test Authentication Locally
- [ ] Run dev server: `npm run dev`
- [ ] Open browser to `http://localhost:5173`
- [ ] Click **"Get Alerts"** button
- [ ] Test **Phone Authentication**:
  - [ ] Enter phone number
  - [ ] Receive OTP
  - [ ] Verify OTP
  - [ ] Redirected to dashboard
  - [ ] Profile menu appears
- [ ] Test **Google Sign-In**:
  - [ ] Click Google button
  - [ ] Select account
  - [ ] Redirected to dashboard
  - [ ] Profile menu appears
- [ ] Test **Logout**:
  - [ ] Click profile menu
  - [ ] Click logout
  - [ ] Signed out successfully

### 8. Test Notifications
- [ ] Sign in with any method
- [ ] Go to `/notifications` page
- [ ] Enable **browser notifications**
  - [ ] Permission prompt appears
  - [ ] Grant permission
  - [ ] Toggle turns on
- [ ] Select **AQI threshold**
  - [ ] Click different thresholds
  - [ ] Selection persists
- [ ] Enable **email** (if Google sign-in)
  - [ ] Toggle works
  - [ ] Email displayed
- [ ] Enable **SMS** (if phone sign-in)
  - [ ] Toggle works
  - [ ] Phone number displayed
- [ ] Refresh page
  - [ ] Preferences persist

### 9. Browser Console Check
- [ ] Open browser DevTools (F12)
- [ ] Check **Console** tab for errors
- [ ] Check **Application** → **Service Workers**
  - [ ] Service worker registered
  - [ ] Status: Activated
- [ ] Check **Application** → **Local Storage**
  - [ ] Firebase auth data present

---

## Build & Deploy

### 10. Build Frontend
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] Check `dist/` folder created
- [ ] Verify files in `dist/` folder

### 11. Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```
- [ ] Deployment successful
- [ ] Note the hosting URL
- [ ] Open URL in browser
- [ ] Test authentication on production

### 12. Deploy Cloud Functions (Optional)
```bash
firebase deploy --only functions
```
- [ ] Functions deployed successfully
- [ ] Check Firebase Console → Functions
- [ ] Verify functions are listed:
  - [ ] `sendAQINotifications`
  - [ ] `triggerAQINotifications`

---

## Post-Deployment Testing

### 13. Production Testing
- [ ] Open production URL
- [ ] Test phone authentication
- [ ] Test Google sign-in
- [ ] Test notification settings
- [ ] Test logout
- [ ] Test on mobile device
- [ ] Test on different browsers:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### 14. Notification Testing
- [ ] Sign in on production
- [ ] Enable browser notifications
- [ ] Grant permission
- [ ] Manually trigger notification (if function deployed):
  ```bash
  curl https://YOUR_REGION-delhibreathe.cloudfunctions.net/triggerAQINotifications
  ```
- [ ] Verify notification received

### 15. Monitor Logs
```bash
# View Firebase Functions logs
firebase functions:log

# View specific function
firebase functions:log --only sendAQINotifications
```
- [ ] Check for errors
- [ ] Verify function executions

---

## Security Checklist

### 16. Security Review
- [ ] `.env` file not committed to git
- [ ] `.env` added to `.gitignore`
- [ ] Firebase API keys are restricted (optional but recommended)
- [ ] Database rules properly configured
- [ ] Only authenticated users can write their own data
- [ ] Service worker uses correct Firebase config
- [ ] HTTPS enabled on production (automatic with Firebase Hosting)

### 17. API Key Restrictions (Optional)
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Select **delhibreathe** project
- [ ] Go to **APIs & Services** → **Credentials**
- [ ] Find your API key
- [ ] Click **Edit**
- [ ] Under **Application restrictions**:
  - [ ] Select **HTTP referrers**
  - [ ] Add your domains
- [ ] Under **API restrictions**:
  - [ ] Select **Restrict key**
  - [ ] Enable only required APIs

---

## Monitoring & Maintenance

### 18. Set Up Monitoring
- [ ] Go to Firebase Console → **Analytics**
- [ ] Enable Google Analytics (optional)
- [ ] Go to **Authentication** → **Users**
- [ ] Monitor user sign-ups
- [ ] Go to **Functions** → **Dashboard**
- [ ] Monitor function executions
- [ ] Set up alerts for errors

### 19. Regular Maintenance
- [ ] Check Firebase quota usage weekly
- [ ] Review authentication logs
- [ ] Monitor function execution times
- [ ] Check for failed notifications
- [ ] Update dependencies monthly:
  ```bash
  npm update
  cd functions && npm update
  ```

---

## Troubleshooting

### Common Issues

#### Phone Auth Not Working
- [ ] Check if Phone provider is enabled
- [ ] Verify phone number format (+91XXXXXXXXXX)
- [ ] Check Firebase quota limits
- [ ] Look for reCAPTCHA errors in console
- [ ] Verify domain is authorized

#### Google Sign-In Not Working
- [ ] Check if Google provider is enabled
- [ ] Verify support email is set
- [ ] Check authorized domains
- [ ] Disable popup blockers
- [ ] Try incognito mode

#### Notifications Not Working
- [ ] Check if permission was granted
- [ ] Verify VAPID key in `.env`
- [ ] Check service worker registration
- [ ] Verify HTTPS (required in production)
- [ ] Check browser console for errors

#### Build Errors
- [ ] Run `npm install` again
- [ ] Clear `node_modules` and reinstall
- [ ] Check TypeScript errors: `npm run build`
- [ ] Verify all imports are correct

---

## Rollback Plan

### If Something Goes Wrong

#### Revert Hosting
```bash
# List previous deployments
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback
```

#### Revert Functions
```bash
# Redeploy previous version
git checkout <previous-commit>
firebase deploy --only functions
```

#### Disable Authentication
- [ ] Go to Firebase Console
- [ ] Authentication → Sign-in method
- [ ] Disable Phone/Google temporarily
- [ ] Fix issues
- [ ] Re-enable

---

## Success Criteria

### ✅ Deployment is Successful When:
- [ ] Users can sign in with phone (OTP)
- [ ] Users can sign in with Google
- [ ] Users are redirected to dashboard after sign-in
- [ ] Profile menu shows user info
- [ ] Logout works correctly
- [ ] Notification settings page loads
- [ ] Browser notifications can be enabled
- [ ] Preferences are saved and persist
- [ ] No console errors
- [ ] Works on mobile and desktop
- [ ] HTTPS enabled
- [ ] Database rules secure user data

---

## Documentation

### 20. Update Documentation
- [ ] Update README.md with setup instructions
- [ ] Document any custom configurations
- [ ] Add screenshots of working features
- [ ] Document known issues (if any)
- [ ] Add contact info for support

---

## Final Checklist

- [ ] All Firebase Console setup complete
- [ ] Environment variables configured
- [ ] Service worker updated
- [ ] Local testing passed
- [ ] Build successful
- [ ] Deployed to production
- [ ] Production testing passed
- [ ] Security review complete
- [ ] Monitoring set up
- [ ] Documentation updated

---

## 🎉 Congratulations!

If all items are checked, your Firebase Authentication system is successfully deployed and ready for users!

**Next Steps:**
1. Monitor user sign-ups
2. Set up email/SMS services for notifications
3. Deploy Cloud Functions for automated alerts
4. Gather user feedback
5. Iterate and improve

**Support:**
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com
- Project Documentation: See `FIREBASE_AUTH_SETUP.md`
