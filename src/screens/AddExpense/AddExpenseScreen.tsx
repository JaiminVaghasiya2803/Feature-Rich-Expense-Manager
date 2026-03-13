import React, { useState, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FileText, Tag, Users, IndianRupee } from 'lucide-react-native';

import { useAddExpense } from '../../hooks/useAddExpense';
import { useGroups } from '../../hooks/useGroups';
import { ExpenseCategory, ExpenseGroup } from '../../types/expense';
import { EXPENSE_CATEGORIES } from '../../constants/categories';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import DatePicker from '../../components/ui/DatePicker';
import Dropdown from '../../components/ui/Dropdown';
import Header from '../../components/ui/Header';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

const AddExpenseScreen = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });

  const navigation = useNavigation();
  const mutation = useAddExpense();
  const { data: groupsData } = useGroups();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('other');
  const [selectedGroupId, setSelectedGroupId] = useState<string | number | undefined>();
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
    return groupsData || [];
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
        <Card style={styles.formCard}>
          <Input
            label="Expense Title"
            placeholder="e.g. Groceries, Coffee, Gas"
            value={title}
            onChangeText={handleTitleChange}
            error={errors.title}
            leftIcon={<FileText size={20} color={themeColors.textTertiary} />}
          />

          <Input
            label="Amount (₹)"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={handleAmountChange}
            error={errors.amount}
            leftIcon={<IndianRupee size={20} color={themeColors.textTertiary} />}
          />

          <DatePicker label="Date" value={selectedDate} onDateChange={handleDateChange} />

          <Dropdown
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={selectedCategory}
            onSelect={value => setSelectedCategory(value as ExpenseCategory)}
            leftIcon={<Tag size={20} color={themeColors.textTertiary} />}
          />

          {groups.length > 0 ? (
            <View style={styles.groupSection}>
              <Text style={styles.sectionLabel}>
                <Users size={16} color={themeColors.textPrimary} /> Group (Optional)
              </Text>
              <Text style={[styles.sectionLabel, { fontSize: 12, fontWeight: '400', color: themeColors.textSecondary, marginBottom: 12 }]}>
                Assign this expense to a group for bill splitting
              </Text>
              <View style={styles.groupGrid}>
                <TouchableOpacity
                  style={[styles.groupItem, !selectedGroupId && styles.selectedGroup]}
                  onPress={() => setSelectedGroupId(undefined)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.groupColorIndicator,
                      { backgroundColor: themeColors.borderMedium },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.groupText, !selectedGroupId && styles.selectedGroupText]}>
                      Personal Expense
                    </Text>
                    <Text style={[styles.groupDescription, !selectedGroupId && styles.selectedGroupDescription]}>
                      Not shared with any group
                    </Text>
                  </View>
                </TouchableOpacity>

                {groups.map(group => (
                  <TouchableOpacity
                    key={group.id}
                    style={[styles.groupItem, selectedGroupId === group.id && styles.selectedGroup]}
                    onPress={() => setSelectedGroupId(group.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.groupColorIndicator, { backgroundColor: group.color }]} />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.groupText,
                          selectedGroupId === group.id && styles.selectedGroupText,
                        ]}
                      >
                        {group.name}
                      </Text>
                      <Text
                        style={[
                          styles.groupDescription,
                          selectedGroupId === group.id && styles.selectedGroupDescription,
                        ]}
                      >
                        {group.members?.length || 0} members • {group.currency || 'INR'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.groupSection}>
              <Text style={styles.sectionLabel}>
                <Users size={16} color={themeColors.textSecondary} /> Groups
              </Text>
              <View style={styles.noGroupsMessage}>
                <Text style={styles.noGroupsText}>
                  No groups available. Create a group to split expenses with others.
                </Text>
                <TouchableOpacity
                  style={styles.createGroupButton}
                  onPress={() => navigation.navigate('CreateGroup' as never)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.createGroupButtonText}>Create Group</Text>
                </TouchableOpacity>
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
