import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Calculator, Receipt, Users, TrendingUp } from 'lucide-react-native';
import { theme } from '../constants/theme';
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
  const apps = [
    {
      id: 'expense-manager' as AppType,
      title: 'Expense Manager',
      description: 'Track your personal expenses and manage budgets',
      icon: Receipt,
      color: theme.colors.primary,
      features: ['Personal tracking', 'Categories', 'Analytics', 'Groups'],
    },
    {
      id: 'split-expenses' as AppType,
      title: 'Split Expenses',
      description: 'Split bills and expenses with friends and family',
      icon: Calculator,
      color: theme.colors.secondary,
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
        <Text style={styles.title}>Choose App</Text>
        <Text style={styles.subtitle}>Switch between expense tracking modes</Text>
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
                isSelected && styles.selectedCard,
              ]}
              padding="lg"
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
                    <Text style={[styles.appTitle, isSelected && { color: app.color }]}>
                      {app.title}
                    </Text>
                    <Text style={styles.appDescription}>{app.description}</Text>
                  </View>
                  
                  {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: app.color }]}>
                      <Text style={styles.selectedText}>Active</Text>
                    </View>
                  )}
                </View>

                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Features:</Text>
                  <View style={styles.featuresList}>
                    {app.features.map((feature, featureIndex) => (
                      <View key={featureIndex} style={styles.featureItem}>
                        <View style={[styles.featureDot, { backgroundColor: app.color }]} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
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
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  appCard: {
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}05`,
  },
  appContent: {
    flex: 1,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  appInfo: {
    flex: 1,
  },
  appTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  appDescription: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  selectedIndicator: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  featuresContainer: {
    marginTop: theme.spacing.md,
  },
  featuresTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: theme.spacing.sm,
  },
  featureText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  footer: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    alignItems: 'center',
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});

export default AppSwitcher;