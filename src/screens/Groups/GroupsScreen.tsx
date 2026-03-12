import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, Calendar, TrendingUp, Search } from 'lucide-react-native';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useGroups } from '../../hooks/useGroups';
import { ExpenseGroup } from '../../types/expense';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
}

const GroupsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const [searchQuery, setSearchQuery] = useState('');
  const { data: groups = [], refetch, isFetching, error } = useGroups();

  console.log('🏠 GroupsScreen - groups:', groups);
  console.log('🏠 GroupsScreen - isFetching:', isFetching);
  console.log('🏠 GroupsScreen - error:', error);

  // Filter groups based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    return groups.filter(group => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groups, searchQuery]);

  const totalGroups = groups.length;
  const totalMembers = 0; // Since ExpenseGroup doesn't have members, we'll set this to 0 for now

  const GroupCard = ({ group }: { group: ExpenseGroup }) => {
    // Since ExpenseGroup doesn't have members or expenses, we'll use placeholder values
    const memberCount = 0;
    const expenseCount = 0;
    const totalAmount = 0;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('EditGroup', { group })}>
        <Card style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View style={[styles.groupColorIndicator, { backgroundColor: group.color || themeColors.primary }]} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDescription}>
                {group.description || 'No description'}
              </Text>
            </View>
            <View style={styles.groupStats}>
              <Text style={styles.groupAmount}>₹{totalAmount.toFixed(2)}</Text>
              <Text style={styles.groupExpenseCount}>{expenseCount} expenses</Text>
            </View>
          </View>
          
          <View style={styles.groupFooter}>
            <View style={styles.groupMembers}>
              <Users size={16} color={themeColors.textSecondary} />
              <Text style={styles.memberCount}>{memberCount} members</Text>
            </View>
            <View style={styles.groupDate}>
              <Calendar size={16} color={themeColors.textSecondary} />
              <Text style={styles.dateText}>
                {new Date(group.createdAt).toLocaleDateString('en-IN')}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Expense Groups</Text>
          <Text style={styles.headerSubtitle}>Organize your shared expenses</Text>
        </View>
        <TouchableOpacity onPress={() => refetch()} style={styles.refreshButton}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Users size={24} color={themeColors.primary} />
            <Text style={styles.statLabel}>Total Groups</Text>
          </View>
          <Text style={styles.statValue}>{totalGroups}</Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <TrendingUp size={24} color={themeColors.secondary} />
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <Text style={styles.statValue}>{totalMembers}</Text>
        </Card>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search groups..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={themeColors.textTertiary} />}
          style={styles.searchInput}
        />
      </View>

      {/* Groups List */}
      <ScrollView 
        style={styles.groupsList} 
        showsVerticalScrollIndicator={false}
      >
        {isFetching && groups.length === 0 ? (
          <Card style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Loading groups...</Text>
          </Card>
        ) : error ? (
          <Card style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Error loading groups</Text>
            <Text style={styles.emptySubtitle}>
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </Text>
            <Button
              title="Retry"
              onPress={() => refetch()}
              style={styles.createButton}
            />
          </Card>
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))
        ) : (
          <Card style={styles.emptyState}>
            <Users size={48} color={themeColors.textTertiary} />
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No groups found' : 'No groups yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Create your first group to start organizing expenses'
              }
            </Text>
            {!searchQuery && (
              <Button
                title="Create Group"
                onPress={() => navigation.navigate('AddGroup')}
                style={styles.createButton}
              />
            )}
          </Card>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddGroup')}
        activeOpacity={0.8}
      >
        <Plus size={24} color={themeColors.textInverse} />
      </TouchableOpacity>
    </View>
  );
};

export default GroupsScreen;