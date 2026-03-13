import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Receipt, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';
import { createUseStyles } from '../styles/createUseStyles';
import { BillGroup, BillExpense, Balance, Settlement } from '../types/billSplit';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getStyles } from './GroupDetails/styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: unknown;
  route: {
    params: {
      group: BillGroup;
    };
  };
}

const GroupDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { group } = route.params;
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const [expenses, setExpenses] = useState<BillExpense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'settle'>('expenses');

  useEffect(() => {
    loadGroupData();
  }, []);

  const loadGroupData = () => {
    // Mock expenses data
    const mockExpenses: BillExpense[] = [
      {
        id: '1',
        title: 'Dinner at Restaurant',
        description: 'Indian restaurant',
        amount: 1200.00,
        currency: 'INR',
        paidBy: group.members[0],
        splitType: 'equal',
        splitPersons: group.members.map(m => ({
          ...m,
          amount: 400.00,
          percentage: 33.33,
          isSelected: true,
        })),
        date: new Date('2024-03-10'),
        groupId: group.id,
      },
      {
        id: '2',
        title: 'Grocery Shopping',
        description: 'Weekly groceries',
        amount: 850.00,
        currency: 'INR',
        paidBy: group.members[1],
        splitType: 'percentage',
        splitPersons: [
          { ...group.members[0], amount: 425.00, percentage: 50, isSelected: true },
          { ...group.members[1], amount: 255.00, percentage: 30, isSelected: true },
          { ...group.members[2], amount: 170.00, percentage: 20, isSelected: true },
        ],
        date: new Date('2024-03-09'),
        groupId: group.id,
      },
    ];

    setExpenses(mockExpenses);
    calculateBalances(mockExpenses);
  };

  const calculateBalances = (expensesList: BillExpense[]) => {
    const memberBalances: { [key: string]: number } = {};
    
    // Initialize balances
    group.members.forEach(member => {
      memberBalances[member.id] = 0;
    });

    // Calculate what each person paid and owes
    expensesList.forEach(expense => {
      // Add what the payer paid
      memberBalances[expense.paidBy.id] += expense.amount;
      
      // Subtract what each person owes
      expense.splitPersons.forEach(splitPerson => {
        if (splitPerson.isSelected) {
          memberBalances[splitPerson.id] -= splitPerson.amount;
        }
      });
    });

    // Convert to Balance objects
    const balancesList: Balance[] = group.members.map(member => ({
      person: member,
      balance: memberBalances[member.id],
      currency: group.currency,
    }));

    setBalances(balancesList);
    calculateSettlements(balancesList);
  };

  const calculateSettlements = (balancesList: Balance[]) => {
    const settlements: Settlement[] = [];
    const debtors = balancesList.filter(b => b.balance < 0).sort((a, _b) => a.balance - b.balance);
    const creditors = balancesList.filter(b => b.balance > 0).sort((a, _b) => b.balance - a.balance);

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debt = Math.abs(debtors[i].balance);
      const credit = creditors[j].balance;
      const amount = Math.min(debt, credit);

      if (amount > 0.01) { // Avoid tiny amounts
        settlements.push({
          from: debtors[i].person,
          to: creditors[j].person,
          amount,
          currency: group.currency,
        });
      }

      debtors[i].balance += amount;
      creditors[j].balance -= amount;

      if (Math.abs(debtors[i].balance) < 0.01) i++;
      if (Math.abs(creditors[j].balance) < 0.01) j++;
    }

    setSettlements(settlements);
  };

  const addExpense = () => {
    navigation.navigate('AddBillExpense', {
      groupMembers: group.members,
      groupId: group.id,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const ExpenseItem = ({ expense }: { expense: BillExpense }) => (
    <Card style={styles.expenseItem}>
      <View style={styles.expenseHeader}>
        <View style={styles.expenseInfo}>
          <Text style={styles.expenseTitle}>{expense.title}</Text>
          <Text style={styles.expenseDescription}>{expense.description}</Text>
          <View style={styles.expenseDetails}>
            <Calendar size={14} color={themeColors.textSecondary} />
            <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
            <Text style={styles.expenseSeparator}>•</Text>
            <Text style={styles.expensePaidBy}>Paid by {expense.paidBy.name}</Text>
          </View>
        </View>
        <View style={styles.expenseAmount}>
          <Text style={styles.expenseAmountText}>₹{expense.amount.toFixed(2)}</Text>
          <Text style={styles.expenseSplitType}>{expense.splitType}</Text>
        </View>
      </View>
      
      <View style={styles.expenseSplit}>
        {expense.splitPersons.map(person => (
          <View key={person.id} style={styles.splitPersonItem}>
            <View style={[styles.splitPersonAvatar, { backgroundColor: person.color }]}>
              <Text style={styles.splitPersonInitial}>
                {person.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.splitPersonAmount}>₹{person.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </Card>
  );

  const BalanceItem = ({ balance }: { balance: Balance }) => (
    <View style={styles.balanceItem}>
      <View style={styles.balancePersonInfo}>
        <View style={[styles.balanceAvatar, { backgroundColor: balance.person.color }]}>
          <Text style={styles.balanceInitial}>
            {balance.person.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.balanceName}>{balance.person.name}</Text>
      </View>
      <View style={styles.balanceAmount}>
        <Text style={[
          styles.balanceAmountText,
          { color: balance.balance >= 0 ? themeColors.secondary : themeColors.danger }
        ]}>
          {balance.balance >= 0 ? '+' : ''}₹{balance.balance.toFixed(2)}
        </Text>
        <Text style={styles.balanceStatus}>
          {balance.balance > 0 ? 'is owed' : balance.balance < 0 ? 'owes' : 'settled up'}
        </Text>
      </View>
    </View>
  );

  const SettlementItem = ({ settlement }: { settlement: Settlement }) => (
    <Card style={styles.settlementItem}>
      <View style={styles.settlementInfo}>
        <View style={styles.settlementPersons}>
          <View style={[styles.settlementAvatar, { backgroundColor: settlement.from.color }]}>
            <Text style={styles.settlementInitial}>
              {settlement.from.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.settlementArrow}>→</Text>
          <View style={[styles.settlementAvatar, { backgroundColor: settlement.to.color }]}>
            <Text style={styles.settlementInitial}>
              {settlement.to.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.settlementText}>
          {settlement.from.name} owes {settlement.to.name}
        </Text>
      </View>
      <Text style={styles.settlementAmount}>₹{settlement.amount.toFixed(2)}</Text>
    </Card>
  );

  const TabButton = ({ 
    tab, 
    title, 
    icon: Icon 
  }: { 
    tab: 'expenses' | 'balances' | 'settle'; 
    title: string; 
    icon: unknown;
  }) => (
    <TouchableOpacity
      style={[
        styles.tabButton, 
        activeTab === tab && [styles.activeTab, { borderBottomColor: themeColors.primary }]
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Icon 
        size={20} 
        color={activeTab === tab ? themeColors.primary : themeColors.textSecondary} 
      />
      <Text style={[
        styles.tabText,
        activeTab === tab && styles.activeTabText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{group.name}</Text>
          <Text style={styles.headerSubtitle}>{group.members.length} members</Text>
        </View>
        <TouchableOpacity onPress={addExpense}>
          <Plus size={24} color={themeColors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.groupSummary}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Receipt size={20} color={themeColors.primary} />
              <Text style={styles.summaryValue}>{expenses.length}</Text>
              <Text style={styles.summaryLabel}>Expenses</Text>
            </View>
            <View style={styles.summaryItem}>
              <DollarSign size={20} color={themeColors.secondary} />
              <Text style={styles.summaryValue}>
                ₹{expenses.reduce((sum, _e) => sum + e.amount, 0).toFixed(2)}
              </Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
            <View style={styles.summaryItem}>
              <Users size={20} color={themeColors.warning} />
              <Text style={styles.summaryValue}>{settlements.length}</Text>
              <Text style={styles.summaryLabel}>Settlements</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.tabs}>
        <TabButton tab="expenses" title="Expenses" icon={Receipt} />
        <TabButton tab="balances" title="Balances" icon={TrendingUp} />
        <TabButton tab="settle" title="Settle Up" icon={Users} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'expenses' && (
          <View style={styles.expensesList}>
            {expenses.length > 0 ? (
              expenses.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))
            ) : (
              <Card style={styles.emptyState}>
                <Receipt size={48} color={themeColors.textTertiary} />
                <Text style={styles.emptyTitle}>No expenses yet</Text>
                <Text style={styles.emptySubtitle}>
                  Add your first expense to start tracking
                </Text>
                <Button
                  title="Add Expense"
                  onPress={addExpense}
                  style={styles.addButton}
                />
              </Card>
            )}
          </View>
        )}

        {activeTab === 'balances' && (
          <Card style={styles.balancesCard}>
            {balances.map(balance => (
              <BalanceItem key={balance.person.id} balance={balance} />
            ))}
          </Card>
        )}

        {activeTab === 'settle' && (
          <View style={styles.settleContent}>
            {settlements.length > 0 ? (
              settlements.map((settlement, _index) => (
                <SettlementItem key={index} settlement={settlement} />
              ))
            ) : (
              <Card style={styles.emptyState}>
                <Users size={48} color={themeColors.textTertiary} />
                <Text style={styles.emptyTitle}>All settled up!</Text>
                <Text style={styles.emptySubtitle}>
                  Everyone's balances are even
                </Text>
              </Card>
            )}
          </View>
        )}
      </ScrollView>

      {activeTab === 'expenses' && (
        <View style={styles.footer}>
          <Button
            title="Add Expense"
            onPress={addExpense}
            style={styles.addExpenseButton}
          />
        </View>
      )}
    </View>
  );
};

export default GroupDetailsScreen;