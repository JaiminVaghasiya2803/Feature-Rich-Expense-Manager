export type ExpenseCategory = 
  | 'food' 
  | 'travel' 
  | 'shopping' 
  | 'entertainment'
  | 'transport'
  | 'health'
  | 'education'
  | 'utilities'
  | 'groceries'
  | 'clothing'
  | 'gifts'
  | 'other';

export type ExpenseGroup = {
  id: number | string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  members?: GroupMember[];
  currency?: string;
};

export type GroupMember = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  color?: string;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  groupId?: number | string;
  date: string;
  updatedAt: string;
};
