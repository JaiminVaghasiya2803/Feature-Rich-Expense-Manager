import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors } from '../styles/colors';

type CustomThemeColors = Partial<ThemeColors>;

interface CustomThemeContextType {
  customTheme: CustomThemeColors | null;
  setCustomTheme: (theme: CustomThemeColors) => void;
  resetToDefault: () => void;
  previewMode: boolean;
  setPreviewMode: (enabled: boolean) => void;
  previewTheme: CustomThemeColors | null;
  applyPreview: () => void;
  cancelPreview: () => void;
  isCustomThemeActive: boolean;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

const CUSTOM_THEME_STORAGE_KEY = '@custom_theme';

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customTheme, setCustomThemeState] = useState<CustomThemeColors | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<CustomThemeColors | null>(null);

  useEffect(() => {
    loadCustomTheme();
  }, []);

  const loadCustomTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setCustomThemeState(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading custom theme:', error);
    }
  };

  const saveCustomTheme = async (theme: CustomThemeColors) => {
    try {
      await AsyncStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('Error saving custom theme:', error);
    }
  };

  const setCustomTheme = (theme: CustomThemeColors) => {
    if (previewMode) {
      setPreviewTheme(theme);
    } else {
      setCustomThemeState(theme);
      saveCustomTheme(theme);
    }
  };

  const resetToDefault = async () => {
    try {
      await AsyncStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
      setCustomThemeState(null);
      setPreviewTheme(null);
      setPreviewMode(false);
    } catch (error) {
      console.error('Error resetting theme:', error);
    }
  };

  const applyPreview = () => {
    if (previewTheme) {
      setCustomThemeState(previewTheme);
      saveCustomTheme(previewTheme);
      setPreviewTheme(null);
      setPreviewMode(false);
    }
  };

  const cancelPreview = () => {
    setPreviewTheme(null);
    setPreviewMode(false);
  };

  const isCustomThemeActive = customTheme !== null || previewTheme !== null;

  return (
    <CustomThemeContext.Provider value={{
      customTheme: previewMode ? previewTheme : customTheme,
      setCustomTheme,
      resetToDefault,
      previewMode,
      setPreviewMode,
      previewTheme,
      applyPreview,
      cancelPreview,
      isCustomThemeActive,
    }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = (): CustomThemeContextType => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};