import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BillGroup, BillExpense, Person } from '../types/billSplit';

interface BillSplitState {
  groups: BillGroup[];
  currentGroup: BillGroup | null;
  loading: boolean;
  error: string | null;
}

type BillSplitAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_GROUPS'; payload: BillGroup[] }
  | { type: 'ADD_GROUP'; payload: BillGroup }
  | { type: 'UPDATE_GROUP'; payload: BillGroup }
  | { type: 'DELETE_GROUP'; payload: string }
  | { type: 'SET_CURRENT_GROUP'; payload: BillGroup | null }
  | { type: 'ADD_EXPENSE'; payload: { groupId: string; expense: BillExpense } }
  | { type: 'UPDATE_EXPENSE'; payload: { groupId: string; expense: BillExpense } }
  | { type: 'DELETE_EXPENSE'; payload: { groupId: string; expenseId: string } };

interface BillSplitContextType extends BillSplitState {
  // Group actions
  createGroup: (group: Omit<BillGroup, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGroup: (group: BillGroup) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
  loadGroups: () => Promise<void>;
  setCurrentGroup: (group: BillGroup | null) => void;
  
  // Expense actions
  addExpense: (groupId: string, expense: Omit<BillExpense, 'id'>) => Promise<void>;
  updateExpense: (groupId: string, expense: BillExpense) => Promise<void>;
  deleteExpense: (groupId: string, expenseId: string) => Promise<void>;
  
  // Member actions
  addMemberToGroup: (groupId: string, member: Omit<Person, 'id'>) => Promise<void>;
  removeMemberFromGroup: (groupId: string, memberId: string) => Promise<void>;
}

const initialState: BillSplitState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

const billSplitReducer = (state: BillSplitState, action: BillSplitAction): BillSplitState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };
    
    case 'UPDATE_GROUP':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload.id ? action.payload : group
        ),
        currentGroup: state.currentGroup?.id === action.payload.id ? action.payload : state.currentGroup,
      };
    
    case 'DELETE_GROUP':
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.payload),
        currentGroup: state.currentGroup?.id === action.payload ? null : state.currentGroup,
      };
    
    case 'SET_CURRENT_GROUP':
      return { ...state, currentGroup: action.payload };
    
    case 'ADD_EXPENSE':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload.groupId
            ? { ...group, expenses: [...group.expenses, action.payload.expense] }
            : group
        ),
        currentGroup: state.currentGroup?.id === action.payload.groupId
          ? { ...state.currentGroup, expenses: [...state.currentGroup.expenses, action.payload.expense] }
          : state.currentGroup,
      };
    
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload.groupId
            ? {
                ...group,
                expenses: group.expenses.map(expense =>
                  expense.id === action.payload.expense.id ? action.payload.expense : expense
                ),
              }
            : group
        ),
        currentGroup: state.currentGroup?.id === action.payload.groupId
          ? {
              ...state.currentGroup,
              expenses: state.currentGroup.expenses.map(expense =>
                expense.id === action.payload.expense.id ? action.payload.expense : expense
              ),
            }
          : state.currentGroup,
      };
    
    case 'DELETE_EXPENSE':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload.groupId
            ? { ...group, expenses: group.expenses.filter(expense => expense.id !== action.payload.expenseId) }
            : group
        ),
        currentGroup: state.currentGroup?.id === action.payload.groupId
          ? { ...state.currentGroup, expenses: state.currentGroup.expenses.filter(expense => expense.id !== action.payload.expenseId) }
          : state.currentGroup,
      };
    
    default:
      return state;
  }
};

const BillSplitContext = createContext<BillSplitContextType | undefined>(undefined);

const STORAGE_KEY = '@bill_split_data';

export const BillSplitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(billSplitReducer, initialState);

  // Load data from storage on app start
  useEffect(() => {
    loadGroups();
  }, []);

  // Save data to storage whenever groups change
  useEffect(() => {
    if (state.groups.length > 0) {
      saveToStorage();
    }
  }, [state.groups]);

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.groups));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const loadGroups = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (storedData) {
        const groups: BillGroup[] = JSON.parse(storedData);
        // Convert date strings back to Date objects
        const processedGroups = groups.map(group => ({
          ...group,
          createdAt: new Date(group.createdAt),
          updatedAt: new Date(group.updatedAt),
          expenses: group.expenses.map(expense => ({
            ...expense,
            date: new Date(expense.date),
          })),
        }));
        dispatch({ type: 'SET_GROUPS', payload: processedGroups });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load groups' });
      console.error('Error loading groups:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createGroup = async (groupData: Omit<BillGroup, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newGroup: BillGroup = {
        ...groupData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch({ type: 'ADD_GROUP', payload: newGroup });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create group' });
      throw error;
    }
  };

  const updateGroup = async (group: BillGroup) => {
    try {
      const updatedGroup = { ...group, updatedAt: new Date() };
      dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update group' });
      throw error;
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      dispatch({ type: 'DELETE_GROUP', payload: groupId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete group' });
      throw error;
    }
  };

  const setCurrentGroup = (group: BillGroup | null) => {
    dispatch({ type: 'SET_CURRENT_GROUP', payload: group });
  };

  const addExpense = async (groupId: string, expenseData: Omit<BillExpense, 'id'>) => {
    try {
      const newExpense: BillExpense = {
        ...expenseData,
        id: Date.now().toString(),
      };
      dispatch({ type: 'ADD_EXPENSE', payload: { groupId, expense: newExpense } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add expense' });
      throw error;
    }
  };

  const updateExpense = async (groupId: string, expense: BillExpense) => {
    try {
      dispatch({ type: 'UPDATE_EXPENSE', payload: { groupId, expense } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update expense' });
      throw error;
    }
  };

  const deleteExpense = async (groupId: string, expenseId: string) => {
    try {
      dispatch({ type: 'DELETE_EXPENSE', payload: { groupId, expenseId } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete expense' });
      throw error;
    }
  };

  const addMemberToGroup = async (groupId: string, memberData: Omit<Person, 'id'>) => {
    try {
      const group = state.groups.find(g => g.id === groupId);
      if (!group) throw new Error('Group not found');

      const newMember: Person = {
        ...memberData,
        id: Date.now().toString(),
      };

      const updatedGroup = {
        ...group,
        members: [...group.members, newMember],
        updatedAt: new Date(),
      };

      dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add member' });
      throw error;
    }
  };

  const removeMemberFromGroup = async (groupId: string, memberId: string) => {
    try {
      const group = state.groups.find(g => g.id === groupId);
      if (!group) throw new Error('Group not found');

      // Check if member has any expenses
      const hasExpenses = group.expenses.some(expense =>
        expense.paidBy.id === memberId ||
        expense.splitPersons.some(sp => sp.id === memberId && sp.isSelected)
      );

      if (hasExpenses) {
        throw new Error('Cannot remove member with existing expenses');
      }

      const updatedGroup = {
        ...group,
        members: group.members.filter(m => m.id !== memberId),
        updatedAt: new Date(),
      };

      dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to remove member' });
      throw error;
    }
  };

  const contextValue: BillSplitContextType = {
    ...state,
    createGroup,
    updateGroup,
    deleteGroup,
    loadGroups,
    setCurrentGroup,
    addExpense,
    updateExpense,
    deleteExpense,
    addMemberToGroup,
    removeMemberFromGroup,
  };

  return (
    <BillSplitContext.Provider value={contextValue}>
      {children}
    </BillSplitContext.Provider>
  );
};

export const useBillSplit = (): BillSplitContextType => {
  const context = useContext(BillSplitContext);
  if (!context) {
    throw new Error('useBillSplit must be used within a BillSplitProvider');
  }
  return context;
};