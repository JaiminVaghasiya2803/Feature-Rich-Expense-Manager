import React, { useState, useMemo } from 'react';
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

import { useAddExpense } from '../hooks/useAddExpense';
import { useGroups } from '../hooks/useGroups';
import { theme } from '../constants/theme';
import { ExpenseCategory, ExpenseGroup } from '../types/expense';
import { EXPENSE_CATEGORIES } from '../constants/categories';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import DatePicker from '../components/ui/DatePicker';
import Dropdown from '../components/ui/Dropdown';
import InrIcon from '../components/ui/InrIcon';
import Header from '../components/ui/Header';

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const mutation = useAddExpense();
  const { data: groupsData } = useGroups();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('other');
  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({});

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

  // Memoized groups data
  const groups: ExpenseGroup[] = useMemo(() => {
    return groupsData?.pages.flat() ?? [];
  }, [groupsData]);

  // Memoized form validation
  const isFormValid = useMemo(() => {
    return title.trim() && amount.trim() && !isNaN(Number(amount)) && Number(amount) > 0;
  }, [title, amount]);

  // Form validation function
  const validateForm = () => {
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
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    const tempId = Date.now() + Math.floor(Math.random() * 1000);

    mutation.mutate({
      id: tempId,
      title: title.trim(),
      amount: Number(amount),
      category: selectedCategory,
      groupId: selectedGroupId,
      date: selectedDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });

    navigation.goBack();
  };

  // Simple input handlers
  const handleTitleChange = (text: string) => {
    setTitle(text);
    setErrors(prev => ({ ...prev, title: undefined }));
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
    setErrors(prev => ({ ...prev, amount: undefined }));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Add New Expense"
        subtitle="Track your spending"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <Card style={styles.formCard} padding="xl" delay={100}>
          <Input
            label="Expense Title"
            placeholder="e.g. Groceries, Coffee, Gas"
            value={title}
            onChangeText={handleTitleChange}
            error={errors.title}
            leftIcon={<FileText size={20} color={theme.colors.text.tertiary} />}
          />

          <Input
            label="Amount (₹)"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={handleAmountChange}
            error={errors.amount}
            leftIcon={<InrIcon size={20} color={theme.colors.text.tertiary} />}
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
            title="Add Expense"
            onPress={handleSubmit}
            disabled={!isFormValid}
            loading={mutation.isPending}
            style={styles.submitButton}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

export default AddExpenseScreen;

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
