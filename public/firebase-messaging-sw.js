// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyDkcNWLtPvQmrAfly7OsfptbC_lwy75id4",
  authDomain: "delhibreathe.firebaseapp.com",
  projectId: "delhibreathe",
  storageBucket: "delhibreathe.firebasestorage.app",
  messagingSenderId: "573127193014",
  appId: "1:573127193014:web:62a385807322f934e09117"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'AQI Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'Air quality has changed',
    icon: '/logo.png',
    badge: '/logo.png',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
