import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPLASH_CONFIG } from '../config/splashConfig';

interface SplashContextType {
  isLoading: boolean;
  showSplash: boolean;
  finishSplash: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    initializeSplash();
  }, []);

  const initializeSplash = async () => {
    try {
      const startTime = Date.now();
      
      // Check if splash has been shown before
      const hasShownSplash = await AsyncStorage.getItem(SPLASH_CONFIG.storageKeys.splashShown);
      
      // Determine if we should show splash
      const shouldShowSplash = SPLASH_CONFIG.showOnEveryLaunch || !hasShownSplash;
      
      // Simulate app initialization (loading data, checking auth, etc.)
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, SPLASH_CONFIG.minimumDuration - elapsedTime);
      
      // Ensure minimum duration
      setTimeout(() => {
        setIsLoading(false);
        setShowSplash(shouldShowSplash);
      }, remainingTime);
      
    } catch (error) {
      console.error('Error initializing splash:', error);
      setIsLoading(false);
      setShowSplash(false);
    }
  };

  const finishSplash = async () => {
    try {
      // Mark splash as shown
      await AsyncStorage.setItem(SPLASH_CONFIG.storageKeys.splashShown, 'true');
      setShowSplash(false);
    } catch (error) {
      console.error('Error finishing splash:', error);
      setShowSplash(false);
    }
  };

  return (
    <SplashContext.Provider value={{ isLoading, showSplash, finishSplash }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = (): SplashContextType => {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error('useSplash must be used within a SplashProvider');
  }
  return context;
};