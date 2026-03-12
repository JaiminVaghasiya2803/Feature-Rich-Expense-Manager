import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Users, FileText, Palette } from 'lucide-react-native';

import { useEditGroup } from '../hooks/useEditGroup';
import { ExpenseGroup } from '../types/expense';
import { theme } from '../constants/theme';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';

const GROUP_COLORS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444',
  '#F59E0B', '#10B981', '#3B82F6', '#6B7280',
  '#84CC16', '#F97316', '#14B8A6', '#8B5A2B',
];

type Props = {
  route: {
    params: {
      group: ExpenseGroup;
    };
  };
};

const EditGroupScreen: React.FC<Props> = ({ route }) => {
  const { group } = route.params;
  const navigation = useNavigation();
  const mutation = useEditGroup();

  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || '');
  const [selectedColor, setSelectedColor] = useState(group.color);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Group name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    mutation.mutate({
      id: group.id,
      updates: {
        name: name.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
        updatedAt: new Date().toISOString(),
      },
    });

    navigation.goBack();
  };

  const isFormValid = name.trim();
  const hasChanges = 
    name.trim() !== group.name || 
    (description.trim() || undefined) !== group.description || 
    selectedColor !== group.color;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Edit Group"
        subtitle="Update group details"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <Card style={styles.formCard} padding="xl">
          <Input
            label="Group Name"
            placeholder="e.g. Vacation 2024, Work Expenses"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
            leftIcon={<Users size={20} color={theme.colors.text.tertiary} />}
          />

          <Input
            label="Description (Optional)"
            placeholder="Brief description of this group"
            value={description}
            onChangeText={setDescription}
            leftIcon={<FileText size={20} color={theme.colors.text.tertiary} />}
            multiline
            numberOfLines={3}
            style={styles.descriptionInput}
          />

          <View style={styles.colorSection}>
            <Text style={styles.colorLabel}>
              <Palette size={16} color={theme.colors.text.primary} /> Group Color
            </Text>
            <View style={styles.colorGrid}>
              {GROUP_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                  activeOpacity={0.8}
                />
              ))}
            </View>
          </View>

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

export default EditGroupScreen;

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
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  colorSection: {
    marginBottom: theme.spacing.lg,
  },
  colorLabel: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: theme.colors.text.primary,
    transform: [{ scale: 1.1 }],
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
});