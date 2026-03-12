import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';
import Card from '../components/ui/Card';

interface Props {
  route: {
    params: {
      expense: any;
    };
  };
}

const EditExpenseScreen: React.FC<Props> = ({ route }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.backgroundDefault }]}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.content}>
        <Card style={styles.placeholderCard}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>
            Edit Expense
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            This is a placeholder screen for editing expenses.
          </Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderCard: {
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditExpenseScreen;