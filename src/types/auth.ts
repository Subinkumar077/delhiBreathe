export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface NotificationPreferences {
  browser: boolean;
  email: boolean;
  sms: boolean;
  aqiThreshold: number;
  enabled?: boolean;
  frequency?: 'realtime' | 'hourly' | 'daily';
}
