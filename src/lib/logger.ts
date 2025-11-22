/**
 * Logger utility - only logs in development mode
 */

const isDev = import.meta.env.DEV;

export const logger = {
  /**
   * Log error messages (development only)
   */
  error: (...args: unknown[]): void => {
    if (isDev) {
      console.error(...args);
    }
  },

  /**
   * Log warning messages (development only)
   */
  warn: (...args: unknown[]): void => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Log info messages (development only)
   */
  info: (...args: unknown[]): void => {
    if (isDev) {
      console.log(...args);
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (...args: unknown[]): void => {
    if (isDev) {
      console.debug(...args);
    }
  },
};
