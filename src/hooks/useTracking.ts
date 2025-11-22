import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  getConsent, 
  addTrackingEvent, 
  getCachedIPInfo, 
  cacheIPInfo,
  TrackingEvent 
} from '@/lib/tracking-storage';
import { fetchIPInfo, parseLocation } from '@/services/ipinfo.service';
import { requestGeolocation } from '@/services/geolocation.service';
import { logger } from '@/lib/logger';

/**
 * Hook for tracking user interactions with IP and GPS data
 */
export function useTracking() {
  const [hasConsent, setHasConsent] = useState<boolean>(true);
  const trackingInProgress = useRef<boolean>(false);

  // Update consent status when storage changes (kept for compatibility but always true)
  useEffect(() => {
    const handleStorageChange = () => {
      // Force consent to be true
      setHasConsent(true);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Gather tracking data (IP + GPS + browser info)
   */
  const gatherTrackingData = useCallback(async () => {
    const data: Partial<TrackingEvent> = {
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      url: window.location.href,
      referrer: document.referrer || undefined,
    };

    // Get IP info (cached or fetch)
    let ipInfo = getCachedIPInfo();
    if (!ipInfo) {
      ipInfo = await fetchIPInfo();
      if (ipInfo) {
        cacheIPInfo(ipInfo);
      }
    }

    if (ipInfo) {
      data.ip = ipInfo.ip;
      data.city = ipInfo.city;
      data.region = ipInfo.region;
      data.country = ipInfo.country;
      data.timezone = ipInfo.timezone;
      data.isp = ipInfo.isp;

      // Parse location from IP
      // const coords = parseLocation(ipInfo.loc);
      // if (coords && !data.latitude) { // Use IP location as fallback
      //   data.latitude = coords.latitude;
      //   data.longitude = coords.longitude;
      // }
    }

    // Get GPS coordinates (if available)
    const geoData = await requestGeolocation();
    if (geoData) {
      data.latitude = geoData.latitude; // GPS overrides IP location
      data.longitude = geoData.longitude;
      data.accuracy = geoData.accuracy;
    }

    return data;
  }, []);

  /**
   * Track a page view
   */
  const trackPageView = useCallback(async () => {
    if (trackingInProgress.current) return;

    try {
      trackingInProgress.current = true;
      const trackingData = await gatherTrackingData();

      const event: TrackingEvent = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        type: 'page_view',
        userAgent: trackingData.userAgent!,
        screenResolution: trackingData.screenResolution!,
        language: trackingData.language!,
        url: trackingData.url!,
        referrer: trackingData.referrer,
        ip: trackingData.ip,
        city: trackingData.city,
        region: trackingData.region,
        country: trackingData.country,
        timezone: trackingData.timezone,
        isp: trackingData.isp,
        latitude: trackingData.latitude,
        longitude: trackingData.longitude,
        accuracy: trackingData.accuracy,
      };

      addTrackingEvent(event);
    } catch (error) {
      logger.error('[Tracking] Failed to track page view:', error);
    } finally {
      trackingInProgress.current = false;
    }
  }, [gatherTrackingData]);

  /**
   * Track a custom event (click, interaction, etc.)
   */
  const trackEvent = useCallback(async (
    type: 'click' | 'custom',
    metadata?: Record<string, unknown>
  ) => {
    try {
      const trackingData = await gatherTrackingData();

      const event: TrackingEvent = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        type,
        userAgent: trackingData.userAgent!,
        screenResolution: trackingData.screenResolution!,
        language: trackingData.language!,
        url: trackingData.url!,
        referrer: trackingData.referrer,
        ip: trackingData.ip,
        city: trackingData.city,
        region: trackingData.region,
        country: trackingData.country,
        timezone: trackingData.timezone,
        isp: trackingData.isp,
        latitude: trackingData.latitude,
        longitude: trackingData.longitude,
        accuracy: trackingData.accuracy,
        metadata,
      };

      addTrackingEvent(event);
    } catch (error) {
      logger.error('[Tracking] Failed to track event:', error);
    }
  }, [gatherTrackingData]);

  return {
    hasConsent,
    trackPageView,
    trackEvent,
    isTracking: trackingInProgress.current,
  };
}
