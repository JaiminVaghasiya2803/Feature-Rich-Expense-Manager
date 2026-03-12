import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { theme } from '../../constants/theme';

export interface DropdownOption {
  id: string;
  label: string;
  icon?: string;
  color?: string;
  description?: string;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onSelect,
  error,
  containerStyle,
  leftIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.id === value);

  const handleSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
  };

  const renderOption = ({ item }: { item: DropdownOption }) => (
    <TouchableOpacity
      style={[
        styles.option,
        value === item.id && styles.selectedOption,
      ]}
      onPress={() => handleSelect(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.optionContent}>
        {item.icon && <Text style={styles.optionIcon}>{item.icon}</Text>}
        <View style={styles.optionTextContainer}>
          <Text
            style={[
              styles.optionText,
              value === item.id && { color: item.color || theme.colors.primary },
            ]}
          >
            {item.label}
          </Text>
          {item.description && (
            <Text style={styles.optionDescription}>{item.description}</Text>
          )}
        </View>
        {value === item.id && (
          <Check size={20} color={item.color || theme.colors.primary} />
        )}
      </View>
      {item.color && (
        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          error && styles.error,
          isOpen && styles.focused,
        ]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <View style={styles.selectedContent}>
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <Text style={styles.selectedIcon}>{selectedOption.icon}</Text>
              )}
              <Text style={styles.selectedText}>{selectedOption.label}</Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>{placeholder}</Text>
          )}
        </View>
        
        <ChevronDown 
          size={20} 
          color={theme.colors.text.tertiary}
          style={[styles.chevron, isOpen && styles.chevronRotated]}
        />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

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
              <Text style={styles.modalTitle}>{label || 'Select Option'}</Text>
            </View>
            
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.id}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    minHeight: 48,
  },
  focused: {
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  error: {
    borderColor: theme.colors.danger,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  selectedContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  selectedText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  placeholderText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
  chevron: {
    marginLeft: theme.spacing.sm,
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
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
    maxHeight: '70%',
    width: '100%',
    ...theme.shadows.lg,
  },
  modalHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  optionsList: {
    maxHeight: 400,
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
    fontSize: 18,
    marginRight: theme.spacing.md,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  optionDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
  },
  colorIndicator: {
    position: 'absolute',
    right: theme.spacing.lg,
    top: '50%',
    width: 4,
    height: '60%',
    borderRadius: 2,
    transform: [{ translateY: -12 }],
  },
});

export default Dropdown;