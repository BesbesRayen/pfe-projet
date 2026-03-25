/**
 * Application Constants
 */

// API Configuration
export const API_CONFIG = {
  timeout: 15000,
  retries: 3,
};

// Feature Flags
export const FEATURES = {
  GOOGLE_SIGNIN_ENABLED: true,
  EMAIL_SIGNIN_ENABLED: true,
  PHONE_SIGNIN_ENABLED: false,
  BIOMETRIC_ENABLED: false,
};

// Google Auth Configuration
export const GOOGLE_AUTH = {
  // Get these from Google Cloud Console
  // https://console.cloud.google.com/
  IOS_CLIENT_ID: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  ANDROID_CLIENT_ID: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  WEB_CLIENT_ID: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
};

// App Configuration
export const APP_CONFIG = {
  version: '1.0.0',
  buildNumber: 1,
  environment: 'development',
};

// User Session
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
