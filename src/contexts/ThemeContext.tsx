import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: ColorSchemeName;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ColorSchemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<ColorSchemeName>(systemTheme);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemeState(savedTheme as ColorSchemeName);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (newTheme: ColorSchemeName) => {
    try {
      if (newTheme) {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } else {
        await AsyncStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setTheme = (newTheme: ColorSchemeName) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};