import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, Receipt, TrendingUp } from 'lucide-react-native';
import { BillGroup } from '../../types/billSplit';
import { ExpenseGroup } from '../../types/expense';
import { useGroups } from '../../hooks/useGroups';
import { convertExpenseGroupToBillGroup } from '../../utils/groupConverters';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: unknown;
}

const BillSplitHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });
  
  const { data: expenseGroups = [], isLoading, error } = useGroups();
  const [groups, setGroups] = useState<BillGroup[]>([]);
  const [totalBalance] = useState(0);

  useEffect(() => {
    // Convert ExpenseGroups to BillGroups using utility function
    const convertedGroups: BillGroup[] = expenseGroups.map(convertExpenseGroupToBillGroup);
    setGroups(convertedGroups);
  }, [expenseGroups]);

  const createNewGroup = () => {
    // @ts-ignore - navigation type will be fixed later
    navigation.navigate('CreateGroup');
  };

  const openGroup = (group: BillGroup) => {
    // @ts-ignore - navigation type will be fixed later
    navigation.navigate('GroupDetails', { group });
  };

  const GroupCard = ({ group }: { group: BillGroup }) => {
    const totalExpenses = group.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return (
      <TouchableOpacity onPress={() => openGroup(group)}>
        <Card style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View style={[styles.groupColorIndicator, { backgroundColor: group.color }]} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
            </View>
            <View style={styles.groupStats}>
              <Text style={styles.groupAmount}>₹{totalExpenses.toFixed(2)}</Text>
              <Text style={styles.groupMembersText}>{group.members.length} members</Text>
            </View>
          </View>
          
          <View style={styles.groupMembers}>
            <Users size={16} color={themeColors.textSecondary} />
            <Text style={styles.membersList}>
              {group.members.length > 0 
                ? group.members.map(m => m.name).join(', ')
                : 'No members'
              }
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bill Splitter</Text>
        <Text style={styles.headerSubtitle}>Split expenses the easy way - Made for India</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Receipt size={24} color={themeColors.primary} />
          <Text style={styles.statValue}>{groups.length}</Text>
          <Text style={styles.statLabel}>Active Groups</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <TrendingUp size={24} color={themeColors.secondary} />
          <Text style={styles.statValue}>₹{totalBalance.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Your Balance</Text>
        </Card>
      </View>

      {/* Groups List */}
      <View style={styles.groupsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Groups</Text>
          <TouchableOpacity onPress={createNewGroup}>
            <Plus size={24} color={themeColors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.groupsList} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Loading groups...</Text>
            </Card>
          ) : error ? (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Error loading groups</Text>
              <Text style={styles.emptySubtitle}>
                Please check your connection and try again
              </Text>
            </Card>
          ) : groups.length > 0 ? (
            groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Users size={48} color={themeColors.textTertiary} />
              <Text style={styles.emptyTitle}>No groups yet</Text>
              <Text style={styles.emptySubtitle}>
                Create your first group to start splitting expenses
              </Text>
              <Button
                title="Create Group"
                onPress={createNewGroup}
                style={styles.createButton}
              />
            </Card>
          )}
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={createNewGroup}>
        <Plus size={24} color={themeColors.textInverse} />
      </TouchableOpacity>
    </View>
  );
};

export default BillSplitHomeScreen;