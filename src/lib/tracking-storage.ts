import { logger } from './logger';

// Tracking Data Types
export interface TrackingEvent {
  id: string;
  timestamp: number;
  type: "page_view" | "click" | "custom";

  // IP Data (from IPInfo.io)
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  isp?: string;

  // GPS Data (from Geolocation API)
  latitude?: number;
  longitude?: number;
  accuracy?: number;

  // Browser/Device Info
  userAgent: string;
  screenResolution: string;
  language: string;

  // Page Info
  url: string;
  referrer?: string;

  // Custom Data
  metadata?: Record<string, unknown>;
}

export interface IPInfoCache {
  data: IPInfoData;
  expires: number;
}

export interface IPInfoData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  isp?: string;
  loc?: string; // "latitude,longitude"
}

// localStorage Keys
const STORAGE_KEYS = {
  CONSENT: "tracking_consent",
  CONSENT_DATE: "tracking_consent_date",
  IP_CACHE: "tracking_ip_cache",
  EVENTS: "tracking_events",
} as const;

// Configuration
const CONFIG = {
  MAX_EVENTS: 100, // Maximum events to store
  IP_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in ms
  MAX_EVENT_AGE: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
};

/**
 * Get tracking consent status
 */
export function getConsent(): boolean {
  // Force consent to be true as per user request
  return true;
}

/**
 * Set tracking consent
 */
export function setConsent(consent: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONSENT, String(consent));
    localStorage.setItem(STORAGE_KEYS.CONSENT_DATE, new Date().toISOString());

    if (!consent) {
      // Clear all tracking data if user declines
      clearAllTrackingData();
    }
  } catch (error) {
    logger.error("[Tracking] Failed to set consent:", error);
  }
}

/**
 * Get cached IP info
 */
export function getCachedIPInfo(): IPInfoData | null {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.IP_CACHE);
    if (!cached) return null;

    const ipCache: IPInfoCache = JSON.parse(cached);

    // Check if cache is expired
    if (Date.now() > ipCache.expires) {
      localStorage.removeItem(STORAGE_KEYS.IP_CACHE);
      return null;
    }

    return ipCache.data;
  } catch (error) {
    logger.error("[Tracking] Failed to get cached IP info:", error);
    return null;
  }
}

/**
 * Cache IP info
 */
export function cacheIPInfo(data: IPInfoData): void {
  try {
    const cache: IPInfoCache = {
      data,
      expires: Date.now() + CONFIG.IP_CACHE_DURATION,
    };
    localStorage.setItem(STORAGE_KEYS.IP_CACHE, JSON.stringify(cache));
  } catch (error) {
    logger.error("[Tracking] Failed to cache IP info:", error);
  }
}

/**
 * Get all tracking events
 */
export function getTrackingEvents(): TrackingEvent[] {
  try {
    const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!events) return [];

    const parsed: TrackingEvent[] = JSON.parse(events);

    // Filter out old events
    const cutoff = Date.now() - CONFIG.MAX_EVENT_AGE;
    return parsed.filter((event) => event.timestamp > cutoff);
  } catch (error) {
    logger.error("[Tracking] Failed to get events:", error);
    return [];
  }
}

/**
 * Validate tracking event
 */
function isValidEvent(event: TrackingEvent): boolean {
  if (!event.id || !event.timestamp || !event.type) {
    logger.error('[Tracking] Invalid event: missing required fields', event);
    return false;
  }
  
  if (!event.url || !event.userAgent) {
    logger.error('[Tracking] Invalid event: missing browser info', event);
    return false;
  }
  
  return true;
}

/**
 * Add a tracking event
 */
export function addTrackingEvent(event: TrackingEvent): void {
  // Validate event before storing
  if (!isValidEvent(event)) {
    return;
  }

  try {
    const events = getTrackingEvents();

    // Add new event at the beginning
    events.unshift(event);

    // Keep only MAX_EVENTS most recent events
    const trimmed = events.slice(0, CONFIG.MAX_EVENTS);

    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(trimmed));
  } catch (error) {
    logger.error("[Tracking] Failed to add event:", error);
  }
}

/**
 * Export all tracking data
 */
export function exportTrackingData(): string {
  try {
    const data = {
      consent: getConsent(),
      consentDate: localStorage.getItem(STORAGE_KEYS.CONSENT_DATE),
      ipCache: getCachedIPInfo(),
      events: getTrackingEvents(),
      exportDate: new Date().toISOString(),
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    logger.error("[Tracking] Failed to export data:", error);
    return "{}";
  }
}

/**
 * Clear all tracking data
 */
export function clearAllTrackingData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.IP_CACHE);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    // Keep consent to remember user's choice
  } catch (error) {
    logger.error("[Tracking] Failed to clear data:", error);
  }
}

/**
 * Get tracking statistics
 */
export function getTrackingStats() {
  const events = getTrackingEvents();

  return {
    totalEvents: events.length,
    pageViews: events.filter((e) => e.type === "page_view").length,
    clicks: events.filter((e) => e.type === "click").length,
    custom: events.filter((e) => e.type === "custom").length,
    hasIPData: events.some((e) => e.ip),
    hasGPSData: events.some((e) => e.latitude && e.longitude),
    oldestEvent:
      events.length > 0 ? new Date(events[events.length - 1].timestamp) : null,
    newestEvent: events.length > 0 ? new Date(events[0].timestamp) : null,
  };
}
