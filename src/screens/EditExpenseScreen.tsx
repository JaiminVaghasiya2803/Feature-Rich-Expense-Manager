import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FileText, Tag, Users } from 'lucide-react-native';

import { useEditExpense } from '../hooks/useEditExpense';
import { useGroups } from '../hooks/useGroups';
import { Expense, ExpenseCategory, ExpenseGroup } from '../types/expense';
import { theme } from '../constants/theme';
import { EXPENSE_CATEGORIES } from '../constants/categories';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import DatePicker from '../components/ui/DatePicker';
import Dropdown from '../components/ui/Dropdown';
import InrIcon from '../components/ui/InrIcon';
import Header from '../components/ui/Header';

type Props = {
  route: {
    params: {
      expense: Expense;
    };
  };
};

const EditExpenseScreen: React.FC<Props> = ({ route }) => {
  const { expense } = route.params;
  const navigation = useNavigation();
  const mutation = useEditExpense();
  const { data: groupsData } = useGroups();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>(expense.category);
  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>(expense.groupId);
  const [selectedDate, setSelectedDate] = useState(new Date(expense.date));
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({});

  const groups: ExpenseGroup[] = useMemo(() => {
    return groupsData?.pages.flat() ?? [];
  }, [groupsData]);

  // Memoized categories for dropdown
  const categoryOptions = useMemo(() => {
    return EXPENSE_CATEGORIES.map(category => ({
      id: category.id,
      label: category.label,
      icon: category.icon,
      color: category.color,
      description: category.description,
    }));
  }, []);

  // Memoized icons to prevent recreation
  const titleIcon = useMemo(() => (
    <FileText size={20} color={theme.colors.text.tertiary} />
  ), []);

  const amountIcon = useMemo(() => (
    <InrIcon size={20} color={theme.colors.text.tertiary} />
  ), []);

  const validateForm = useCallback(() => {
    const newErrors: { title?: string; amount?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, amount]);

  const handleSave = useCallback(() => {
    if (!validateForm()) return;

    mutation.mutate({
      id: expense.id,
      updates: {
        title: title.trim(),
        amount: Number(amount),
        category: selectedCategory,
        groupId: selectedGroupId,
        date: selectedDate.toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    navigation.goBack();
  }, [validateForm, expense.id, title, amount, selectedCategory, selectedGroupId, selectedDate, mutation, navigation]);

  // Handle input changes
  const handleTitleChange = useCallback((text: string) => {
    setTitle(text);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  }, [errors.title]);

  const handleAmountChange = useCallback((text: string) => {
    setAmount(text);
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  }, [errors.amount]);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const isFormValid = useMemo(() => {
    return title.trim() && amount.trim() && !isNaN(Number(amount)) && Number(amount) > 0;
  }, [title, amount]);

  const hasChanges = useMemo(() => {
    return (
      title.trim() !== expense.title || 
      Number(amount) !== expense.amount || 
      selectedCategory !== expense.category ||
      selectedGroupId !== expense.groupId ||
      selectedDate.toISOString() !== expense.date
    );
  }, [title, amount, selectedCategory, selectedGroupId, selectedDate, expense]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Edit Expense"
        subtitle="Update your expense details"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <Card style={styles.formCard} padding="xl">
          <Input
            label="Expense Title"
            placeholder="e.g. Groceries, Coffee, Gas"
            value={title}
            onChangeText={handleTitleChange}
            error={errors.title}
            leftIcon={titleIcon}
          />

          <Input
            label="Amount (₹)"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={handleAmountChange}
            error={errors.amount}
            leftIcon={amountIcon}
          />

          <DatePicker
            label="Date"
            value={selectedDate}
            onDateChange={handleDateChange}
          />

          <Dropdown
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={selectedCategory}
            onSelect={(value) => setSelectedCategory(value as ExpenseCategory)}
            leftIcon={<Tag size={20} color={theme.colors.text.tertiary} />}
          />

          {groups.length > 0 && (
            <View style={styles.groupSection}>
              <Text style={styles.sectionLabel}>
                <Users size={16} color={theme.colors.text.primary} /> Group (Optional)
              </Text>
              <View style={styles.groupGrid}>
                <TouchableOpacity
                  style={[
                    styles.groupItem,
                    !selectedGroupId && styles.selectedGroup,
                  ]}
                  onPress={() => setSelectedGroupId(undefined)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.groupColorIndicator, { backgroundColor: theme.colors.border.medium }]} />
                  <Text style={[styles.groupText, !selectedGroupId && styles.selectedGroupText]}>
                    No Group
                  </Text>
                </TouchableOpacity>
                
                {groups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    style={[
                      styles.groupItem,
                      selectedGroupId === group.id && styles.selectedGroup,
                    ]}
                    onPress={() => setSelectedGroupId(group.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.groupColorIndicator, { backgroundColor: group.color }]} />
                    <Text
                      style={[
                        styles.groupText,
                        selectedGroupId === group.id && styles.selectedGroupText,
                      ]}
                    >
                      {group.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <Button
            title="Save Changes"
            onPress={handleSave}
            disabled={!isFormValid || !hasChanges}
            loading={mutation.isPending}
            style={styles.submitButton}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

export default EditExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  formCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  groupSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupGrid: {
    gap: theme.spacing.sm,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  selectedGroup: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  groupColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  groupText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  selectedGroupText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
});
