import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Palette, 
  Sun, 
  Moon, 
  Smartphone, 
 } from 'lucide-react-native';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const ThemeSettingsScreen: React.FC<Props> = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { customTheme, setCustomTheme, resetToDefault, isCustomThemeActive } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });

  const [selectedCategory, setSelectedCategory] = useState<string>('appearance');
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<'light' | 'dark'>(
    isDark ? 'dark' : 'light'
  );

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Smartphone },
  ];

  const predefinedThemes = {
    light: [
      {
        name: 'Ocean Blue',
        colors: {
          primary: '#0EA5E9',
          primaryLight: '#38BDF8',
          primaryDark: '#0284C7',
          secondary: '#06B6D4',
          secondaryLight: '#22D3EE',
          backgroundDefault: '#F0F9FF',
          backgroundSecondary: '#E0F2FE',
          surface: '#FFFFFF',
          surfaceSecondary: '#F0F9FF',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#0C4A6E',
          textSecondary: '#0369A1',
          textTertiary: '#0284C7',
        }
      },
      {
        name: 'Forest Green',
        colors: {
          primary: '#059669',
          primaryLight: '#10B981',
          primaryDark: '#047857',
          secondary: '#0D9488',
          secondaryLight: '#14B8A6',
          backgroundDefault: '#F0FDF4',
          backgroundSecondary: '#DCFCE7',
          surface: '#FFFFFF',
          surfaceSecondary: '#F0FDF4',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#14532D',
          textSecondary: '#166534',
          textTertiary: '#15803D',
        }
      },
      {
        name: 'Sunset Orange',
        colors: {
          primary: '#EA580C',
          primaryLight: '#FB923C',
          primaryDark: '#C2410C',
          secondary: '#F59E0B',
          secondaryLight: '#FBBF24',
          backgroundDefault: '#FFF7ED',
          backgroundSecondary: '#FFEDD5',
          surface: '#FFFFFF',
          surfaceSecondary: '#FFF7ED',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#9A3412',
          textSecondary: '#C2410C',
          textTertiary: '#EA580C',
        }
      },
      {
        name: 'Royal Purple',
        colors: {
          primary: '#7C3AED',
          primaryLight: '#A78BFA',
          primaryDark: '#5B21B6',
          secondary: '#8B5CF6',
          secondaryLight: '#A78BFA',
          backgroundDefault: '#FAF5FF',
          backgroundSecondary: '#F3E8FF',
          surface: '#FFFFFF',
          surfaceSecondary: '#FAF5FF',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#581C87',
          textSecondary: '#6B21A8',
          textTertiary: '#7C2D92',
        }
      },
      {
        name: 'Rose Pink',
        colors: {
          primary: '#E11D48',
          primaryLight: '#FB7185',
          primaryDark: '#BE123C',
          secondary: '#EC4899',
          secondaryLight: '#F472B6',
          backgroundDefault: '#FFF1F2',
          backgroundSecondary: '#FFE4E6',
          surface: '#FFFFFF',
          surfaceSecondary: '#FFF1F2',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#881337',
          textSecondary: '#9F1239',
          textTertiary: '#BE185D',
        }
      },
      {
        name: 'Golden Amber',
        colors: {
          primary: '#D97706',
          primaryLight: '#F59E0B',
          primaryDark: '#B45309',
          secondary: '#F59E0B',
          secondaryLight: '#FBBF24',
          backgroundDefault: '#FFFBEB',
          backgroundSecondary: '#FEF3C7',
          surface: '#FFFFFF',
          surfaceSecondary: '#FFFBEB',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#92400E',
          textSecondary: '#B45309',
          textTertiary: '#D97706',
        }
      },
      {
        name: 'Emerald Mint',
        colors: {
          primary: '#10B981',
          primaryLight: '#34D399',
          primaryDark: '#059669',
          secondary: '#06B6D4',
          secondaryLight: '#22D3EE',
          backgroundDefault: '#ECFDF5',
          backgroundSecondary: '#D1FAE5',
          surface: '#FFFFFF',
          surfaceSecondary: '#ECFDF5',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#064E3B',
          textSecondary: '#065F46',
          textTertiary: '#047857',
        }
      },
      {
        name: 'Saffron Spice',
        colors: {
          primary: '#FF8C00',
          primaryLight: '#FFA500',
          primaryDark: '#FF7F00',
          secondary: '#FFD700',
          secondaryLight: '#FFFF00',
          backgroundDefault: '#FFF8DC',
          backgroundSecondary: '#FFEFD5',
          surface: '#FFFFFF',
          surfaceSecondary: '#FFF8DC',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#8B4513',
          textSecondary: '#A0522D',
          textTertiary: '#CD853F',
        }
      },
      {
        name: 'Peacock Blue',
        colors: {
          primary: '#005F73',
          primaryLight: '#0A9396',
          primaryDark: '#001219',
          secondary: '#94D2BD',
          secondaryLight: '#E9D8A6',
          backgroundDefault: '#F0F8FF',
          backgroundSecondary: '#E6F3FF',
          surface: '#FFFFFF',
          surfaceSecondary: '#F0F8FF',
          surfaceElevated: '#FFFFFF',
          textPrimary: '#001219',
          textSecondary: '#005F73',
          textTertiary: '#0A9396',
        }
      }
    ],
    dark: [
      {
        name: 'Midnight Dark',
        colors: {
          primary: '#6366F1',
          primaryLight: '#818CF8',
          primaryDark: '#4F46E5',
          secondary: '#8B5CF6',
          secondaryLight: '#A78BFA',
          backgroundDefault: '#0F0F23',
          backgroundSecondary: '#1A1A2E',
          surface: '#16213E',
          surfaceSecondary: '#1A1A2E',
          surfaceElevated: '#0E3460',
          textPrimary: '#E2E8F0',
          textSecondary: '#CBD5E1',
          textTertiary: '#94A3B8',
        }
      },
      {
        name: 'Crimson Red',
        colors: {
          primary: '#DC2626',
          primaryLight: '#EF4444',
          primaryDark: '#B91C1C',
          secondary: '#F59E0B',
          secondaryLight: '#FBBF24',
          backgroundDefault: '#1A0B0B',
          backgroundSecondary: '#2D1B1B',
          surface: '#3D1A1A',
          surfaceSecondary: '#2D1B1B',
          surfaceElevated: '#4D2020',
          textPrimary: '#FEE2E2',
          textSecondary: '#FECACA',
          textTertiary: '#F87171',
        }
      },
      {
        name: 'Steel Gray',
        colors: {
          primary: '#64748B',
          primaryLight: '#94A3B8',
          primaryDark: '#475569',
          secondary: '#6B7280',
          secondaryLight: '#9CA3AF',
          backgroundDefault: '#0F172A',
          backgroundSecondary: '#1E293B',
          surface: '#334155',
          surfaceSecondary: '#1E293B',
          surfaceElevated: '#475569',
          textPrimary: '#F1F5F9',
          textSecondary: '#CBD5E1',
          textTertiary: '#94A3B8',
        }
      },
      {
        name: 'Deep Forest',
        colors: {
          primary: '#10B981',
          primaryLight: '#34D399',
          primaryDark: '#059669',
          secondary: '#0D9488',
          secondaryLight: '#14B8A6',
          backgroundDefault: '#0C1F17',
          backgroundSecondary: '#1A2E23',
          surface: '#1E3A2E',
          surfaceSecondary: '#1A2E23',
          surfaceElevated: '#2D4A3A',
          textPrimary: '#ECFDF5',
          textSecondary: '#D1FAE5',
          textTertiary: '#A7F3D0',
        }
      },
      {
        name: 'Ocean Depths',
        colors: {
          primary: '#0EA5E9',
          primaryLight: '#38BDF8',
          primaryDark: '#0284C7',
          secondary: '#06B6D4',
          secondaryLight: '#22D3EE',
          backgroundDefault: '#0C1821',
          backgroundSecondary: '#1E2A35',
          surface: '#1E3A8A',
          surfaceSecondary: '#1E2A35',
          surfaceElevated: '#1D4ED8',
          textPrimary: '#F0F9FF',
          textSecondary: '#E0F2FE',
          textTertiary: '#BAE6FD',
        }
      },
      {
        name: 'Purple Haze',
        colors: {
          primary: '#8B5CF6',
          primaryLight: '#A78BFA',
          primaryDark: '#7C3AED',
          secondary: '#EC4899',
          secondaryLight: '#F472B6',
          backgroundDefault: '#1A0B2E',
          backgroundSecondary: '#2D1B4E',
          surface: '#3B1E78',
          surfaceSecondary: '#2D1B4E',
          surfaceElevated: '#4C1D95',
          textPrimary: '#FAF5FF',
          textSecondary: '#F3E8FF',
          textTertiary: '#DDD6FE',
        }
      },
      {
        name: 'Amber Night',
        colors: {
          primary: '#F59E0B',
          primaryLight: '#FBBF24',
          primaryDark: '#D97706',
          secondary: '#FB923C',
          secondaryLight: '#FDBA74',
          backgroundDefault: '#1F1611',
          backgroundSecondary: '#2D2317',
          surface: '#451A03',
          surfaceSecondary: '#2D2317',
          surfaceElevated: '#92400E',
          textPrimary: '#FFFBEB',
          textSecondary: '#FEF3C7',
          textTertiary: '#FDE68A',
        }
      },
      {
        name: 'Rose Shadow',
        colors: {
          primary: '#F43F5E',
          primaryLight: '#FB7185',
          primaryDark: '#E11D48',
          secondary: '#EC4899',
          secondaryLight: '#F472B6',
          backgroundDefault: '#1F0B14',
          backgroundSecondary: '#2D1B23',
          surface: '#4C1D30',
          surfaceSecondary: '#2D1B23',
          surfaceElevated: '#881337',
          textPrimary: '#FFF1F2',
          textSecondary: '#FFE4E6',
          textTertiary: '#FECDD3',
        }
      }
    ]
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any);
  };

  const handlePresetApply = (preset: unknown) => {
    const themeType = selectedThemeCategory === 'light' ? 'Light' : 'Dark';
    
    // Actually apply the theme
    setCustomTheme(preset.colors);
    
    // Debug log to verify theme is being set
    console.log('Theme applied:', preset.name, preset.colors);
    
    Alert.alert(
      'Theme Applied',
      `${preset.name} (${themeType}) theme has been applied successfully! You should see the colors change immediately.`,
      [{ text: 'OK' }]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Theme',
      'Are you sure you want to reset all theme customizations to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            resetToDefault();
            Alert.alert('Theme Reset', 'Theme has been reset to default colors.');
          }
        }
      ]
    );
  };

  const renderAppearanceSettings = () => (
    <View>
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Theme Mode</Text>
        <View style={styles.themeOptions}>
          {themeOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = theme === option.key;
            
            return (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.themeOption,
                  isSelected && styles.selectedThemeOption
                ]}
                onPress={() => handleThemeChange(option.key)}
              >
                <IconComponent 
                  size={24} 
                  color={isSelected ? themeColors.primary : themeColors.textSecondary} 
                />
                <Text style={[
                  styles.themeOptionText,
                  isSelected && styles.selectedThemeOptionText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Theme Preview */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Current Theme Preview</Text>
        <Text style={[styles.sectionSubtitle, { marginBottom: 16, lineHeight: 18 }]}>
          Surface: {themeColors.surface} • Background: {themeColors.backgroundDefault}
        </Text>
        <View style={styles.themePreview}>
          <View style={[styles.previewHeader, { backgroundColor: themeColors.surface }]}>
            <Text style={[styles.previewHeaderText, { color: themeColors.textPrimary }]}>
              Header (Surface Color)
            </Text>
          </View>
          <View style={[styles.previewContent, { backgroundColor: themeColors.backgroundDefault }]}>
            <View style={[styles.previewCard, { backgroundColor: themeColors.surface }]}>
              <Text style={[styles.previewCardTitle, { color: themeColors.textPrimary }]}>
                Card Title (Surface Color)
              </Text>
              <Text style={[styles.previewCardText, { color: themeColors.textSecondary }]}>
                This card uses the surface color. You should see it change when you apply different themes.
              </Text>
              <View style={[styles.previewButton, { backgroundColor: themeColors.primary }]}>
                <Text style={[styles.previewButtonText, { color: themeColors.textInverse }]}>
                  Button (Primary Color)
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.previewFooter, { backgroundColor: themeColors.surface }]}>
            <Text style={[styles.previewFooterText, { color: themeColors.textSecondary }]}>
              Footer / Tab Bar (Surface Color)
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quick Themes</Text>
        <Text style={styles.sectionSubtitle}>Complete color schemes that change all app colors</Text>
        
        {/* Theme Category Selector */}
        <View style={styles.themeCategoryTabs}>
          <TouchableOpacity
            style={[
              styles.themeCategoryTab,
              selectedThemeCategory === 'light' && styles.selectedThemeCategoryTab
            ]}
            onPress={() => setSelectedThemeCategory('light')}
          >
            <Sun size={16} color={selectedThemeCategory === 'light' ? themeColors.primary : themeColors.textSecondary} />
            <Text style={[
              styles.themeCategoryTabText,
              selectedThemeCategory === 'light' && styles.selectedThemeCategoryTabText
            ]}>
              Light Themes ({predefinedThemes.light.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.themeCategoryTab,
              selectedThemeCategory === 'dark' && styles.selectedThemeCategoryTab
            ]}
            onPress={() => setSelectedThemeCategory('dark')}
          >
            <Moon size={16} color={selectedThemeCategory === 'dark' ? themeColors.primary : themeColors.textSecondary} />
            <Text style={[
              styles.themeCategoryTabText,
              selectedThemeCategory === 'dark' && styles.selectedThemeCategoryTabText
            ]}>
              Dark Themes ({predefinedThemes.dark.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Description */}
        <Text style={[styles.sectionSubtitle, { marginBottom: 16, lineHeight: 18 }]}>
          {selectedThemeCategory === 'light' 
            ? 'Bright and clean themes perfect for daytime use with light backgrounds and dark text.'
            : 'Dark themes designed for low-light environments with dark backgrounds and light text.'
          }
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsScrollView}>
          <View style={styles.presetThemes}>
            {predefinedThemes[selectedThemeCategory].map((preset, index) => (
              <TouchableOpacity
                key={index}
                style={styles.presetTheme}
                onPress={() => handlePresetApply(preset)}
              >
                <View style={styles.presetColors}>
                  <View style={[styles.presetColor, { backgroundColor: preset.colors.primary }]} />
                  <View style={[styles.presetColor, { backgroundColor: preset.colors.secondary }]} />
                  <View style={[styles.presetColor, { backgroundColor: preset.colors.backgroundDefault }]} />
                  <View style={[styles.presetColor, { backgroundColor: preset.colors.surface }]} />
                </View>
                <Text style={styles.presetName}>{preset.name}</Text>
                <Text style={styles.presetDescription}>
                  {selectedThemeCategory === 'light' ? 'Light theme' : 'Dark theme'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Card>
    </View>
  );

  const categories = [
    { key: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Theme Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your app appearance
          {isCustomThemeActive && ' • Custom theme active'}
        </Text>
      </View>

      <View style={styles.categoryTabs}>
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.key;
          
          return (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryTab,
                isSelected && styles.selectedCategoryTab
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <IconComponent 
                size={20} 
                color={isSelected ? themeColors.primary : themeColors.textSecondary} 
              />
              <Text style={[
                styles.categoryTabText,
                isSelected && styles.selectedCategoryTabText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'appearance' && renderAppearanceSettings()}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Reset to Default"
          onPress={handleReset}
          variant="ghost"
          style={styles.resetButton}
        />
      </View>
    </View>
  );
};

export default ThemeSettingsScreen;