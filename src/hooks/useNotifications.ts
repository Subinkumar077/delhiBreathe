import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  requestNotificationPermission,
  getNotificationPreferences,
  saveNotificationPreferences,
  onMessageListener,
  showNotification,
} from '../services/notifications';
import type { NotificationPreferences } from '../types/auth';

export const useNotifications = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
      checkPermission();
      setupMessageListener();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const prefs = await getNotificationPreferences(user.uid);
      setPreferences(prefs);
    } catch (error) {
      console.error('Failed to load preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPermission = () => {
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
    }
  };

  const setupMessageListener = () => {
    onMessageListener()
      .then((payload: any) => {
        console.log('Received foreground message:', payload);
        showNotification(
          payload.notification?.title || 'AQI Alert',
          payload.notification?.body || 'Air quality has changed',
          payload.notification?.icon
        );
      })
      .catch((err) => console.error('Failed to receive message:', err));
  };

  const requestPermission = async () => {
    if (!user) return false;
    
    try {
      const token = await requestNotificationPermission(user.uid);
      if (token) {
        setPermissionGranted(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to request permission:', error);
      return false;
    }
  };

  const updatePreferences = async (newPreferences: NotificationPreferences) => {
    if (!user) return;
    
    try {
      await saveNotificationPreferences(user.uid, newPreferences);
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  return {
    preferences,
    loading,
    permissionGranted,
    requestPermission,
    updatePreferences,
    loadPreferences,
  };
};
