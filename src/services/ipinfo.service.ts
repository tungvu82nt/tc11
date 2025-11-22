import { IPInfoData } from '@/lib/tracking-storage';
import { logger } from '@/lib/logger';

const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;
const IPINFO_API_URL = 'https://ipinfo.io';
const REQUEST_TIMEOUT = 5000; // 5 seconds

// Validate API key on module load
if (!IPINFO_API_KEY) {
  logger.error('[IPInfo] Missing VITE_IPINFO_API_KEY environment variable');
}

/**
 * Fetch IP geolocation data from IPInfo.io
 */
export async function fetchIPInfo(): Promise<IPInfoData | null> {
  if (!IPINFO_API_KEY) {
    logger.warn('[IPInfo] API key not configured, skipping IP lookup');
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    const response = await fetch(`${IPINFO_API_URL}/json?token=${IPINFO_API_KEY}`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`IPInfo API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse org field to get ISP
    const isp = data.org ? data.org.replace(/^AS\d+\s+/, '') : undefined;
    
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      timezone: data.timezone,
      isp,
      loc: data.loc, // "latitude,longitude"
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        logger.warn('[IPInfo] Request timeout');
      } else {
        logger.error('[IPInfo] Failed to fetch:', error.message);
      }
    }
    return null;
  }
}

/**
 * Check if IP is localhost or private
 */
export function isPrivateIP(ip: string): boolean {
  if (!ip) return false;
  
  // Localhost
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
    return true;
  }
  
  // Private IP ranges (IPv4)
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./,
  ];
  
  return privateRanges.some(range => range.test(ip));
}

/**
 * Parse location string to coordinates
 */
export function parseLocation(loc?: string): { latitude: number; longitude: number } | null {
  if (!loc) return null;
  
  const [lat, lon] = loc.split(',').map(parseFloat);
  
  if (isNaN(lat) || isNaN(lon)) return null;
  
  return { latitude: lat, longitude: lon };
}
