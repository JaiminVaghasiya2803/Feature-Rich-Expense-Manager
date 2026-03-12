import { ColorSchemeName } from 'react-native';

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  
  // Status colors
  success: string;
  danger: string;
  warning: string;
  info: string;
  
  // Background colors
  backgroundDefault: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  surfaceElevated: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Border colors
  borderLight: string;
  borderMedium: string;
  borderDark: string;
  
  // Overlay colors
  overlay: string;
  overlayLight: string;
}

export const lightColors: ThemeColors = {
  // Primary colors
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#10B981',
  secondaryLight: '#34D399',
  
  // Status colors
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Background colors
  backgroundDefault: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  surfaceElevated: '#FFFFFF',
  
  // Text colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  
  // Border colors
  borderLight: '#E2E8F0',
  borderMedium: '#CBD5E1',
  borderDark: '#94A3B8',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
};

export const darkColors: ThemeColors = {
  // Primary colors
  primary: '#818CF8',
  primaryLight: '#A5B4FC',
  primaryDark: '#6366F1',
  secondary: '#34D399',
  secondaryLight: '#6EE7B7',
  
  // Status colors
  success: '#34D399',
  danger: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',
  
  // Background colors
  backgroundDefault: '#0F172A',
  backgroundSecondary: '#1E293B',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  surfaceElevated: '#334155',
  
  // Text colors
  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textInverse: '#1E293B',
  
  // Border colors
  borderLight: '#334155',
  borderMedium: '#475569',
  borderDark: '#64748B',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',
};

export const getThemeColors = (theme: ColorSchemeName): ThemeColors =>
  theme === 'dark' ? darkColors : lightColors;