import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Plus, 
  Users, 
  Calculator, 
  TrendingUp,
  UserPlus,
  Receipt,
} from 'lucide-react-native';
import InrIcon from '../components/ui/InrIcon';
import { theme } from '../constants/theme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';

interface SplitGroup {
  id: string;
  name: string;
  members: string[];
  totalExpenses: number;
  yourBalance: number;
  color: string;
}

interface SplitExpense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  groupId: string;
}

const SplitExpensesScreen = () => {
  const [groups] = useState<SplitGroup[]>([
    {
      id: '1',
      name: 'Weekend Trip',
      members: ['You', 'Alice', 'Bob', 'Charlie'],
      totalExpenses: 2450,
      yourBalance: -320,
      color: theme.colors.primary,
    },
    {
      id: '2',
      name: 'Roommates',
      members: ['You', 'Sarah', 'Mike'],
      totalExpenses: 1200,
      yourBalance: 150,
      color: theme.colors.secondary,
    },
    {
      id: '3',
      name: 'Office Lunch',
      members: ['You', 'Team A', 'Team B'],
      totalExpenses: 890,
      yourBalance: -45,
      color: theme.colors.warning,
    },
  ]);

  const [recentExpenses] = useState<SplitExpense[]>([
    {
      id: '1',
      title: 'Hotel Booking',
      amount: 800,
      paidBy: 'You',
      splitBetween: ['You', 'Alice', 'Bob', 'Charlie'],
      date: '2024-03-10',
      groupId: '1',
    },
    {
      id: '2',
      title: 'Groceries',
      amount: 120,
      paidBy: 'Sarah',
      splitBetween: ['You', 'Sarah', 'Mike'],
      date: '2024-03-09',
      groupId: '2',
    },
  ]);

  const totalBalance = useMemo(() => {
    return groups.reduce((sum, group) => sum + group.yourBalance, 0);
  }, [groups]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return theme.colors.success;
    if (balance < 0) return theme.colors.danger;
    return theme.colors.text.secondary;
  };

  const getBalanceText = (balance: number) => {
    if (balance > 0) return `You are owed ${formatCurrency(balance)}`;
    if (balance < 0) return `You owe ${formatCurrency(balance)}`;
    return 'All settled up';
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Split Expenses"
        subtitle="Manage shared expenses with friends"
        showBackButton={false}
        rightComponent={
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Balance Overview */}
        <Card style={styles.balanceCard} padding="xl" delay={0}>
          <View style={styles.balanceHeader}>
            <Calculator size={32} color={theme.colors.primary} />
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Your Overall Balance</Text>
              <Text style={[styles.balanceAmount, { color: getBalanceColor(totalBalance) }]}>
                {getBalanceText(totalBalance)}
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard} padding="lg" delay={100}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
                <Receipt size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: `${theme.colors.secondary}15` }]}>
                <UserPlus size={24} color={theme.colors.secondary} />
              </View>
              <Text style={styles.actionText}>Create Group</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: `${theme.colors.warning}15` }]}>
                <InrIcon size={24} color={theme.colors.warning} />
              </View>
              <Text style={styles.actionText}>Settle Up</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Groups */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Groups</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {groups.map((group, index) => (
            <Card key={group.id} style={styles.groupCard} padding="lg" delay={(index + 2) * 100}>
              <TouchableOpacity style={styles.groupContent}>
                <View style={styles.groupHeader}>
                  <View style={[styles.groupIcon, { backgroundColor: `${group.color}15` }]}>
                    <Users size={20} color={group.color} />
                  </View>
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupMembers}>
                      {group.members.length} members
                    </Text>
                  </View>
                  <View style={styles.groupBalance}>
                    <Text style={styles.groupTotal}>
                      {formatCurrency(group.totalExpenses)}
                    </Text>
                    <Text style={[
                      styles.groupYourBalance,
                      { color: getBalanceColor(group.yourBalance) }
                    ]}>
                      {group.yourBalance >= 0 ? '+' : ''}{formatCurrency(group.yourBalance)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Recent Expenses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentExpenses.map((expense, index) => {
            const group = groups.find(g => g.id === expense.groupId);
            return (
              <Card key={expense.id} style={styles.expenseCard} padding="lg" delay={(index + 5) * 100}>
                <TouchableOpacity style={styles.expenseContent}>
                  <View style={styles.expenseHeader}>
                    <View style={styles.expenseInfo}>
                      <Text style={styles.expenseTitle}>{expense.title}</Text>
                      <Text style={styles.expenseGroup}>{group?.name}</Text>
                      <Text style={styles.expenseDetails}>
                        Paid by {expense.paidBy} • Split {expense.splitBetween.length} ways
                      </Text>
                    </View>
                    <View style={styles.expenseAmount}>
                      <Text style={styles.expenseTotal}>
                        {formatCurrency(expense.amount)}
                      </Text>
                      <Text style={styles.expenseShare}>
                        Your share: {formatCurrency(expense.amount / expense.splitBetween.length)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    padding: theme.spacing.sm,
    backgroundColor: `${theme.colors.primary}15`,
    borderRadius: theme.borderRadius.md,
  },
  balanceCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceInfo: {
    marginLeft: theme.spacing.lg,
    flex: 1,
  },
  balanceLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  balanceAmount: {
    ...theme.typography.h3,
    fontWeight: '700',
    marginTop: theme.spacing.xs,
  },
  actionsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  seeAllText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  groupCard: {
    marginBottom: theme.spacing.md,
  },
  groupContent: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  groupMembers: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  groupBalance: {
    alignItems: 'flex-end',
  },
  groupTotal: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  groupYourBalance: {
    ...theme.typography.caption,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
  },
  expenseCard: {
    marginBottom: theme.spacing.md,
  },
  expenseContent: {
    flex: 1,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  expenseTitle: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  expenseGroup: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  expenseDetails: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  expenseAmount: {
    alignItems: 'flex-end',
  },
  expenseTotal: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  expenseShare: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});

export default SplitExpensesScreen;