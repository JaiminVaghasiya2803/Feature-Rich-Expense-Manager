import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Users, 
  Percent, 
  Calculator,
  Check,
  IndianRupee
} from 'lucide-react-native';
import { Person, SplitPerson, SplitType, BillExpense } from '../../types/billSplit';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
  route: {
    params: {
      groupMembers: Person[];
      groupId: string;
    };
  };
}

const AddBillExpenseScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const { groupMembers, groupId } = route.params;
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState<Person>(groupMembers[0]);
  const [splitType, setSplitType] = useState<SplitType>('equal');
  const [splitPersons, setSplitPersons] = useState<SplitPerson[]>([]);
  const [currency] = useState('INR');

  useEffect(() => {
    // Initialize split persons with all group members selected
    const initialSplitPersons: SplitPerson[] = groupMembers.map(person => ({
      ...person,
      amount: 0,
      percentage: 100 / groupMembers.length,
      isSelected: true,
    }));
    setSplitPersons(initialSplitPersons);
  }, [groupMembers]);

  useEffect(() => {
    // Recalculate splits when amount or split type changes
    if (amount && splitPersons.length > 0) {
      calculateSplits();
    }
  }, [amount, splitType, splitPersons.length]);

  const calculateSplits = () => {
    const totalAmount = parseFloat(amount) || 0;
    const selectedPersons = splitPersons.filter(p => p.isSelected);
    
    if (selectedPersons.length === 0) return;

    let updatedSplitPersons = [...splitPersons];

    if (splitType === 'equal') {
      const equalAmount = totalAmount / selectedPersons.length;
      updatedSplitPersons = updatedSplitPersons.map(person => ({
        ...person,
        amount: person.isSelected ? equalAmount : 0,
        percentage: person.isSelected ? 100 / selectedPersons.length : 0,
      }));
    } else if (splitType === 'percentage') {
      // Keep existing percentages, just recalculate amounts
      updatedSplitPersons = updatedSplitPersons.map(person => ({
        ...person,
        amount: person.isSelected ? (totalAmount * person.percentage) / 100 : 0,
      }));
    }
    // For 'amount' type, amounts are set manually

    setSplitPersons(updatedSplitPersons);
  };

  const togglePersonSelection = (personId: string) => {
    const updatedSplitPersons = splitPersons.map(person => {
      if (person.id === personId) {
        return { ...person, isSelected: !person.isSelected };
      }
      return person;
    });
    setSplitPersons(updatedSplitPersons);
  };

  const updatePersonPercentage = (personId: string, percentage: number) => {
    const updatedSplitPersons = splitPersons.map(person => {
      if (person.id === personId) {
        return { ...person, percentage };
      }
      return person;
    });
    setSplitPersons(updatedSplitPersons);
  };

  const updatePersonAmount = (personId: string, amount: number) => {
    const updatedSplitPersons = splitPersons.map(person => {
      if (person.id === personId) {
        return { ...person, amount };
      }
      return person;
    });
    setSplitPersons(updatedSplitPersons);
  };

  const normalizePercentages = () => {
    const selectedPersons = splitPersons.filter(p => p.isSelected);
    const totalPercentage = selectedPersons.reduce((sum, p) => sum + p.percentage, 0);
    
    if (totalPercentage !== 100 && selectedPersons.length > 0) {
      const factor = 100 / totalPercentage;
      const updatedSplitPersons = splitPersons.map(person => ({
        ...person,
        percentage: person.isSelected ? person.percentage * factor : 0,
      }));
      setSplitPersons(updatedSplitPersons);
    }
  };

  const getTotalSplitAmount = () => {
    return splitPersons.reduce((sum, person) => sum + (person.isSelected ? person.amount : 0), 0);
  };

  const getTotalPercentage = () => {
    return splitPersons.reduce((sum, person) => sum + (person.isSelected ? person.percentage : 0), 0);
  };

  const isValidSplit = () => {
    const totalAmount = parseFloat(amount) || 0;
    const splitTotal = getTotalSplitAmount();
    const percentageTotal = getTotalPercentage();
    
    if (splitType === 'percentage') {
      return Math.abs(percentageTotal - 100) < 0.01;
    }
    
    return Math.abs(splitTotal - totalAmount) < 0.01;
  };

  const saveExpense = () => {
    if (!title.trim() || !amount || !isValidSplit()) {
      Alert.alert('Error', 'Please fill all required fields and ensure split amounts are correct.');
      return;
    }

    const expense: BillExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      amount: parseFloat(amount),
      currency,
      paidBy,
      splitType,
      splitPersons: splitPersons.filter(p => p.isSelected),
      date: new Date(),
      groupId,
    };

    // Save expense logic here
    console.log('Saving expense:', expense);
    
    Alert.alert('Success', 'Expense added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const SplitTypeSelector = () => (
    <Card style={styles.splitTypeCard}>
      <Text style={styles.cardTitle}>Split Type</Text>
      <View style={styles.splitTypeButtons}>
        <TouchableOpacity
          style={[styles.splitTypeButton, splitType === 'equal' && styles.activeSplitType]}
          onPress={() => setSplitType('equal')}
        >
          <Users size={20} color={splitType === 'equal' ? themeColors.textInverse : themeColors.textSecondary} />
          <Text style={[styles.splitTypeText, splitType === 'equal' && styles.activeSplitTypeText]}>
            Equal
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.splitTypeButton, splitType === 'percentage' && styles.activeSplitType]}
          onPress={() => setSplitType('percentage')}
        >
          <Percent size={20} color={splitType === 'percentage' ? themeColors.textInverse : themeColors.textSecondary} />
          <Text style={[styles.splitTypeText, splitType === 'percentage' && styles.activeSplitTypeText]}>
            Percentage
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.splitTypeButton, splitType === 'amount' && styles.activeSplitType]}
          onPress={() => setSplitType('amount')}
        >
          <IndianRupee size={20} color={splitType === 'amount' ? themeColors.textInverse : themeColors.textSecondary} />
          <Text style={[styles.splitTypeText, splitType === 'amount' && styles.activeSplitTypeText]}>
            Amount
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const PersonSplitItem = ({ person }: { person: SplitPerson }) => (
    <View style={styles.personSplitItem}>
      <TouchableOpacity
        style={styles.personSelector}
        onPress={() => togglePersonSelection(person.id)}
      >
        <View style={[styles.checkbox, person.isSelected && styles.checkedBox]}>
          {person.isSelected && <Check size={16} color={themeColors.textInverse} />}
        </View>
        <View style={[styles.personAvatar, { backgroundColor: person.color || themeColors.primary }]}>
          <Text style={styles.personInitial}>{person.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.personName}>{person.name}</Text>
      </TouchableOpacity>

      {person.isSelected && (
        <View style={styles.splitInputs}>
          {splitType === 'percentage' && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.splitInput}
                value={person.percentage.toFixed(1)}
                onChangeText={(text) => updatePersonPercentage(person.id, parseFloat(text) || 0)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={themeColors.textTertiary}
              />
              <Text style={styles.inputSuffix}>%</Text>
            </View>
          )}
          
          {splitType === 'amount' && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>₹</Text>
              <TextInput
                style={styles.splitInput}
                value={person.amount.toFixed(2)}
                onChangeText={(text) => updatePersonAmount(person.id, parseFloat(text) || 0)}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={themeColors.textTertiary}
              />
            </View>
          )}
          
          {splitType === 'equal' && (
            <View style={styles.equalAmount}>
              <Text style={styles.equalAmountText}>₹{person.amount.toFixed(2)}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Expense</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.expenseCard}>
          <Input
            label="Expense Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter expense title"
            style={styles.input}
          />
          
          <View style={styles.amountInputContainer}>
            <Text style={styles.amountLabel}>Amount</Text>
            <View style={styles.amountInput}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountTextInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor={themeColors.textTertiary}
              />
            </View>
          </View>
          
          <Input
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            style={styles.input}
            multiline
          />
        </Card>

        <Card style={styles.paidByCard}>
          <Text style={styles.cardTitle}>Paid By</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.paidByList}>
              {groupMembers.map((member) => (
                <TouchableOpacity
                  key={member.id}
                  style={[styles.paidByItem, paidBy.id === member.id && styles.activePaidBy]}
                  onPress={() => setPaidBy(member)}
                >
                  <View style={[styles.memberAvatar, { backgroundColor: member.color || themeColors.primary }]}>
                    <Text style={styles.memberInitial}>{member.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <Text style={[styles.memberName, paidBy.id === member.id && styles.activeMemberName]}>
                    {member.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Card>

        <SplitTypeSelector />

        <Card style={styles.splitCard}>
          <View style={styles.splitHeader}>
            <Text style={styles.cardTitle}>Split Between</Text>
            {splitType === 'percentage' && (
              <TouchableOpacity onPress={normalizePercentages}>
                <Calculator size={20} color={themeColors.primary} />
              </TouchableOpacity>
            )}
          </View>
          
          {splitPersons.map((person) => (
            <PersonSplitItem key={person?.id} person={person} />
          ))}
          
          <View style={styles.splitSummary}>
            <Text style={styles.summaryText}>
              Total: ₹{getTotalSplitAmount().toFixed(2)} 
              {splitType === 'percentage' && ` (${getTotalPercentage().toFixed(1)}%)`}
            </Text>
            {!isValidSplit() && (
              <Text style={styles.errorText}>
                {splitType === 'percentage' 
                  ? 'Percentages must total 100%' 
                  : 'Split amounts must equal total amount'}
              </Text>
            )}
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Save Expense"
          onPress={saveExpense}
          disabled={!isValidSplit() || !title.trim() || !amount}
          style={styles.saveButton}
        />
      </View>
    </View>
  );
};

export default AddBillExpenseScreen;