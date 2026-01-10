import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';
import { ref, set, get } from 'firebase/database';
import { database } from './firebase';

// Request notification permission and get FCM token
export const requestNotificationPermission = async (userId: string) => {
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted' && messaging) {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      
      // Save token to database
      await saveNotificationToken(userId, token);
      return token;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
};

// Save notification token to Firebase
const saveNotificationToken = async (userId: string, token: string) => {
  try {
    const tokenRef = ref(database, `users/${userId}/notificationTokens/${token}`);
    await set(tokenRef, {
      token,
      createdAt: Date.now(),
      platform: 'web',
    });
  } catch (error) {
    console.error('Error saving notification token:', error);
  }
};

// Save notification preferences
export const saveNotificationPreferences = async (
  userId: string,
  preferences: {
    browser: boolean;
    email: boolean;
    sms: boolean;
    aqiThreshold: number;
  }
) => {
  try {
    const prefsRef = ref(database, `users/${userId}/notificationPreferences`);
    await set(prefsRef, preferences);
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    throw error;
  }
};

// Get notification preferences
export const getNotificationPreferences = async (userId: string) => {
  try {
    const prefsRef = ref(database, `users/${userId}/notificationPreferences`);
    const snapshot = await get(prefsRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    
    // Default preferences
    return {
      browser: true,
      email: false,
      sms: false,
      aqiThreshold: 150, // Unhealthy level
    };
  } catch (error) {
    console.error('Error getting notification preferences:', error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });

// Show browser notification
export const showNotification = (title: string, body: string, icon?: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/logo.png',
      badge: '/logo.png',
    });
  }
};
