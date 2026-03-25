import { Platform } from 'react-native';

/**
 * Set to `true` when testing on a **physical phone** with Expo Go (same Wi‑Fi as your PC).
 * Set `LAN_HOST` to your computer's LAN IP (e.g. ipconfig → IPv4).
 */
/** Set `false` when using Android emulator / iOS simulator on the same machine. */
export const USE_LAN_FOR_DEVICE = true;
/** Your PC's IPv4 on Wi‑Fi (`ipconfig`). Must match phone + PC same network for Expo Go. */
export const LAN_HOST = '192.168.1.167';

/**
 * CreadiTN Spring Boot backend — port 8081
 */
export const API_BASE_URL = USE_LAN_FOR_DEVICE
  ? `http://${LAN_HOST}:8081`
  : Platform.OS === 'android'
    ? 'http://10.0.2.2:8081'
    : 'http://127.0.0.1:8081';

export const API_TIMEOUT_MS = 15000;

if (__DEV__) {
  console.log('[API Config]');
  console.log('  USE_LAN_FOR_DEVICE:', USE_LAN_FOR_DEVICE);
  console.log('  Platform:', Platform.OS);
  console.log('  API_BASE_URL:', API_BASE_URL);
  console.log('  TIMEOUT:', API_TIMEOUT_MS, 'ms');
}
