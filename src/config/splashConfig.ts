export const SPLASH_CONFIG = {
  // App branding
  appName: 'ExpenseTracker',
  tagline: 'Smart Expense Management',
  subtitle: 'Made for India',
  description: 'Track expenses, split bills, and manage your finances effortlessly',
  version: '1.0.0',
  
  // Timing configuration
  showOnEveryLaunch: true, // Set to false to show only on first launch
  minimumDuration: 2000, // Minimum time to show splash (in ms)
  autoFinishDelay: 3000, // Auto finish after this time (in ms)
  
  // Animation configuration
  logoAnimationDuration: 800,
  textAnimationDuration: 600,
  progressAnimationDuration: 2500,
  iconRotationDuration: 3000,
  
  // Features to highlight
  features: [
    { icon: 'TrendingUp', label: 'Track', color: 'secondary' },
    { icon: 'Users', label: 'Split', color: 'warning' },
    { icon: 'IndianRupee', label: 'Save', color: 'info' },
  ],
  
  // Storage keys
  storageKeys: {
    splashShown: '@app_splash_shown',
  },
} as const;

export type SplashFeature = typeof SPLASH_CONFIG.features[0];
export type SplashColorKey = 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'danger';