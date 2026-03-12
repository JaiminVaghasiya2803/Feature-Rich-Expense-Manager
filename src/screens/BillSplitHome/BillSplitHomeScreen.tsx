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
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
}

const BillSplitHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const [groups, setGroups] = useState<BillGroup[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
     loadGroups();
  }, []);

  const loadGroups = async () => {
    // Mock data for demonstration
    const mockGroups: BillGroup[] = [
      {
        id: '1',
        name: 'Weekend Trip',
        description: 'Cabin rental and activities',
        members: [
          { id: '1', name: 'Rahul Sharma', color: '#FF6B6B' },
          { id: '2', name: 'Priya Patel', color: '#4ECDC4' },
          { id: '3', name: 'Amit Kumar', color: '#45B7D1' },
        ],
        expenses: [],
        currency: 'INR',
        createdAt: new Date(),
        updatedAt: new Date(),
        color: '#FF6B6B',
      },
      {
        id: '2',
        name: 'Dinner Party',
        description: 'Italian restaurant',
        members: [
          { id: '1', name: 'Rahul Sharma', color: '#FF6B6B' },
          { id: '4', name: 'Sneha Gupta', color: '#96CEB4' },
        ],
        expenses: [],
        currency: 'INR',
        createdAt: new Date(),
        updatedAt: new Date(),
        color: '#4ECDC4',
      },
    ];
    setGroups(mockGroups);
  };

  const createNewGroup = () => {
    navigation.navigate('CreateGroup');
  };

  const openGroup = (group: BillGroup) => {
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
              {group.members.map(m => m.name).join(', ')}
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
          {groups.length > 0 ? (
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