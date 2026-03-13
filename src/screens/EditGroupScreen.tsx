import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Users, FileText, Palette } from 'lucide-react-native';

import { useEditGroup } from '../hooks/useEditGroup';
import { ExpenseGroup } from '../types/expense';
import { getThemeColors } from '../styles/colors';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';

const GROUP_COLORS = [
  '#6366F1',
  '#8B5CF6',
  '#EC4899',
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#6B7280',
  '#84CC16',
  '#F97316',
  '#14B8A6',
  '#8B5A2B',
];

type Props = {
  route: {
    params: {
      group: ExpenseGroup;
    };
  };
};

const EditGroupScreen: React.FC<Props> = ({ route }) => {
  // All hooks must be called before any early returns
  const navigation = useNavigation();
  const mutation = useEditGroup();
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366F1');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const { group } = route.params || {};

  // Initialize state when group is available
  React.useEffect(() => {
    if (group) {
      setName(group.name || '');
      setDescription(group.description || '');
      setSelectedColor(group.color || '#6366F1');
    }
  }, [group]);

  if (!group) {
    console.error('❌ EditGroupScreen - No group data provided');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Error: No group data provided</Text>
      </View>
    );
  }

  const validateForm = () => {
    const newErrors: { name?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Group name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync({
        id: group.id,
        updates: {
          name: name.trim(),
          description: description.trim() || undefined,
          color: selectedColor,
          updatedAt: new Date().toISOString(),
        },
      });

      navigation.goBack();
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Error updating group:', error);
      }
    }
  };

  const isFormValid = name.trim();
  const hasChanges =
    name.trim() !== group.name ||
    (description.trim() || undefined) !== group.description ||
    selectedColor !== group.color;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.backgroundDefault }]}>
      <SafeAreaView edges={['top']} />

      <Header
        title="Edit Group"
        subtitle="Update group details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.formCard}>
          <Text style={{ fontSize: 16, marginBottom: 16, color: themeColors.textPrimary }}>
            Editing: {group.name}
          </Text>

          <Input
            label="Group Name"
            placeholder="e.g. Vacation 2024, Work Expenses"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
            leftIcon={<Users size={20} color={themeColors.textTertiary} />}
          />

          <Input
            label="Description (Optional)"
            placeholder="Brief description of this group"
            value={description}
            onChangeText={setDescription}
            leftIcon={<FileText size={20} color={themeColors.textTertiary} />}
            multiline
            numberOfLines={3}
            style={styles.descriptionInput}
          />

          <View style={styles.colorSection}>
            <Text style={[styles.colorLabel, { color: themeColors.textPrimary }]}>
              <Palette size={16} color={themeColors.textPrimary} /> Group Color
            </Text>
            <View style={styles.colorGrid}>
              {GROUP_COLORS.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && [
                      styles.selectedColor,
                      { borderColor: themeColors.textPrimary },
                    ],
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
  },
  scrollView: {
    flex: 1,
  },
  formCard: {
    margin: 24,
    padding: 24,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  colorSection: {
    marginBottom: 24,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    transform: [{ scale: 1.1 }],
  },
  submitButton: {
    marginTop: 16,
  },
});
