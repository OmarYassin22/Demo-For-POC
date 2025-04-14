import clientConfig from './clientConfig.json';

/**
 * Utility for accessing client-specific configuration
 */
export const getClientConfig = () => clientConfig.client;

/**
 * Get a nested property from the client configuration using dot notation
 * Example: getConfigValue('theme.primary') returns '#044442'
 * 
 * @param path - The path to the configuration value using dot notation
 * @param defaultValue - Optional default value if the path doesn't exist
 */
export const getConfigValue = (path: string, defaultValue: any = undefined) => {
  const keys = path.split('.');
  let current: any = clientConfig.client;
  
  for (const key of keys) {
    if (current === undefined || current === null) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current !== undefined ? current : defaultValue;
};

/**
 * Get theme color from the configuration
 */
export const getThemeColor = (colorName: string, defaultColor?: string) => {
  return getConfigValue(`theme.${colorName}`, defaultColor);
};

/**
 * CSS Variables for use in styled components or inline styles
 */
export const cssVariables = {
  '--primary-color': getThemeColor('primary'),
  '--secondary-color': getThemeColor('secondary'),
  '--accent-color': getThemeColor('accent'),
  '--error-color': getThemeColor('error'),
};

export default {
  getClientConfig,
  getConfigValue,
  getThemeColor,
  cssVariables
};