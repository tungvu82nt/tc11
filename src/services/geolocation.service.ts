import { logger } from '@/lib/logger';

export interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number; // meters
  timestamp: number;
}

export type GeolocationPermission = 'granted' | 'denied' | 'prompt';

/**
 * Request GPS location from browser Geolocation API
 */
export async function requestGeolocation(): Promise<GeolocationData | null> {
  if (!navigator.geolocation) {
    logger.warn('[Geolocation] API not available');
    return null;
  }
  
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        logger.warn('[Geolocation] Error:', error.message);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            logger.warn('[Geolocation] User denied permission');
            break;
          case error.POSITION_UNAVAILABLE:
            logger.warn('[Geolocation] Position unavailable');
            break;
          case error.TIMEOUT:
            logger.warn('[Geolocation] Request timeout');
            break;
        }
        
        resolve(null);
      },
      {
        enableHighAccuracy: false, // Don't need high accuracy
        timeout: 5000, // 5 seconds
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  });
}

/**
 * Check geolocation permission status
 */
export async function checkGeolocationPermission(): Promise<GeolocationPermission> {
  if (!navigator.permissions) {
    return 'prompt';
  }
  
  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return result.state as GeolocationPermission;
  } catch (error) {
    logger.warn('[Geolocation] Failed to check permission:', error);
    return 'prompt';
  }
}
