import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Calculator, Receipt } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';
import Card from './ui/Card';

export type AppType = 'expense-manager' | 'split-expenses';

interface AppSwitcherProps {
  currentApp: AppType;
  onAppSelect: (app: AppType) => void;
  onClose: () => void;
}

const AppSwitcher: React.FC<AppSwitcherProps> = ({
  currentApp,
  onAppSelect,
  onClose,
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  
  const apps = [
    {
      id: 'expense-manager' as AppType,
      title: 'Expense Manager',
      description: 'Track your personal expenses and manage budgets',
      icon: Receipt,
      color: themeColors.primary,
      features: ['Personal tracking', 'Categories', 'Analytics', 'Groups'],
    },
    {
      id: 'split-expenses' as AppType,
      title: 'Split Expenses',
      description: 'Split bills and expenses with friends and family',
      icon: Calculator,
      color: themeColors.secondary,
      features: ['Bill splitting', 'Group expenses', 'Settlement', 'Balances'],
    },
  ];

  const handleAppSelect = (appId: AppType) => {
    onAppSelect(appId);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Choose App</Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Switch between expense tracking modes</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {apps.map((app, index) => {
          const IconComponent = app.icon;
          const isSelected = currentApp === app.id;
          
          return (
            <Card
              key={app.id}
              style={[
                styles.appCard,
                isSelected && [styles.selectedCard, { borderColor: themeColors.primary, backgroundColor: `${themeColors.primary}05` }],
              ]}
              padding={24}
              delay={index * 100}
            >
              <TouchableOpacity
                style={styles.appContent}
                onPress={() => handleAppSelect(app.id)}
                activeOpacity={0.7}
              >
                <View style={styles.appHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${app.color}15` }]}>
                    <IconComponent size={32} color={app.color} />
                  </View>
                  
                  <View style={styles.appInfo}>
                    <Text style={[styles.appTitle, { color: themeColors.textPrimary }, isSelected && { color: app.color }]}>
                      {app.title}
                    </Text>
                    <Text style={[styles.appDescription, { color: themeColors.textSecondary }]}>{app.description}</Text>
                  </View>
                  
                  {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: app.color }]}>
                      <Text style={[styles.selectedText, { color: themeColors.textInverse }]}>Active</Text>
                    </View>
                  )}
                </View>

                <View style={styles.featuresContainer}>
                  <Text style={[styles.featuresTitle, { color: themeColors.textPrimary }]}>Features:</Text>
                  <View style={styles.featuresList}>
                    {app.features.map((feature, featureIndex) => (
                      <View key={featureIndex} style={styles.featureItem}>
                        <View style={[styles.featureDot, { backgroundColor: app.color }]} />
                        <Text style={[styles.featureText, { color: themeColors.textSecondary }]}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          );
        })}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: themeColors.borderLight }]}>
        <Text style={[styles.footerText, { color: themeColors.textTertiary }]}>
          Your data is kept separate between apps
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  appCard: {
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {},
  appContent: {
    flex: 1,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
  selectedIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuresContainer: {
    marginTop: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  featureText: {
    fontSize: 12,
  },
  footer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AppSwitcher;