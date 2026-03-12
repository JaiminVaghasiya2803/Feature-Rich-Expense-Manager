import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react-native';
import { theme } from '../../constants/theme';

export type SortOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onSelect: (value: string) => void;
  containerStyle?: ViewStyle;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  value,
  onSelect,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.id === value);

  const handleSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <ArrowUpDown size={16} color={theme.colors.text.secondary} />
        <Text style={styles.sortText}>
          {selectedOption?.label || 'Sort by'}
        </Text>
        <ChevronDown 
          size={16} 
          color={theme.colors.text.secondary}
          style={[styles.chevron, isOpen && styles.chevronRotated]}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort by</Text>
            </View>
            
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  value === option.id && styles.selectedOption,
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  {option.icon && (
                    <View style={styles.optionIcon}>{option.icon}</View>
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      value === option.id && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {value === option.id && (
                    <Check size={18} color={theme.colors.primary} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  sortText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginHorizontal: theme.spacing.xs,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: theme.spacing.xs,
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    minWidth: 200,
    maxWidth: 280,
    ...theme.shadows.lg,
  },
  modalHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  option: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  selectedOption: {
    backgroundColor: `${theme.colors.primary}08`,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: theme.spacing.sm,
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default SortDropdown;