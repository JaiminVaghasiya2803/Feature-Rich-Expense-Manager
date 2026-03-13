import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { theme } from '../../constants/theme';

interface DatePickerProps {
  label?: string;
  value: Date;
  onDateChange: (date: Date) => void;
  error?: string;
  containerStyle?: unknown;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onDateChange,
  error,
  containerStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(value.getFullYear(), value.getMonth(), 1));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDateLabel = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays === 1) return 'Tomorrow';
    
    return formatDate(date);
  };

  const handleDateSelect = (selectedDate: Date) => {
    onDateChange(selectedDate);
    setShowPicker(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Start from the first day of the week containing the first day of the month
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    // End at the last day of the week containing the last day of the month
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Quick date options
  const quickOptions = useMemo(() => [
    { label: 'Today', date: new Date() },
    { label: 'Yesterday', date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { label: 'Tomorrow', date: new Date(Date.now() + 24 * 60 * 60 * 1000) },
  ], []);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.dateButton,
          error && styles.errorBorder,
        ]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Calendar size={20} color={theme.colors.text.tertiary} />
        <Text style={styles.dateText}>{getDateLabel(value)}</Text>
        <Text style={styles.fullDate}>{formatDate(value)}</Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Quick Options */}
              <View style={styles.quickOptionsContainer}>
                <Text style={styles.sectionTitle}>Quick Select</Text>
                <View style={styles.quickOptions}>
                  {quickOptions.map((option, _index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.quickOption,
                        value.toDateString() === option.date.toDateString() && styles.selectedQuickOption,
                      ]}
                      onPress={() => handleDateSelect(option.date)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.quickOptionText,
                          value.toDateString() === option.date.toDateString() && styles.selectedQuickOptionText,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Calendar */}
              <View style={styles.calendarContainer}>
                <Text style={styles.sectionTitle}>Calendar</Text>
                
                {/* Month Navigation */}
                <View style={styles.monthHeader}>
                  <TouchableOpacity
                    onPress={() => navigateMonth('prev')}
                    style={styles.navButton}
                    activeOpacity={0.7}
                  >
                    <ChevronLeft size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.monthTitle}>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </Text>
                  
                  <TouchableOpacity
                    onPress={() => navigateMonth('next')}
                    style={styles.navButton}
                    activeOpacity={0.7}
                  >
                    <ChevronRight size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                </View>

                {/* Day Headers */}
                <View style={styles.dayHeaders}>
                  {dayNames.map((day) => (
                    <Text key={day} style={styles.dayHeader}>
                      {day}
                    </Text>
                  ))}
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarGrid}>
                  {calendarDays.map((date, _index) => {
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    const isToday = date.toDateString() === today.toDateString();
                    const isSelected = date.toDateString() === value.toDateString();
                    const isPast = date < today && !isToday;
                    
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.calendarDay,
                          !isCurrentMonth && styles.otherMonthDay,
                          isToday && styles.todayDay,
                          isSelected && styles.selectedDay,
                        ]}
                        onPress={() => handleDateSelect(date)}
                        activeOpacity={0.7}
                        disabled={!isCurrentMonth}
                      >
                        <Text
                          style={[
                            styles.calendarDayText,
                            !isCurrentMonth && styles.otherMonthText,
                            isToday && styles.todayText,
                            isSelected && styles.selectedDayText,
                            isPast && styles.pastDayText,
                          ]}
                        >
                          {date.getDate()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 48,
  },
  errorBorder: {
    borderColor: theme.colors.danger,
  },
  dateText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
    flex: 1,
    fontWeight: '500',
  },
  fullDate: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  closeButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  closeButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  
  // Quick Options
  quickOptionsContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  quickOptions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  quickOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
  },
  selectedQuickOption: {
    backgroundColor: `${theme.colors.primary}15`,
    borderColor: theme.colors.primary,
  },
  quickOptionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  selectedQuickOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  
  // Calendar
  calendarContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  navButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceSecondary,
  },
  monthTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    paddingVertical: theme.spacing.sm,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  todayDay: {
    backgroundColor: `${theme.colors.secondary}20`,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  selectedDay: {
    backgroundColor: theme.colors.primary,
  },
  calendarDayText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  otherMonthText: {
    color: theme.colors.text.tertiary,
  },
  todayText: {
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  selectedDayText: {
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  pastDayText: {
    color: theme.colors.text.secondary,
  },
});

export default DatePicker;