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
  id: number;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  groupId?: number;
  date: string;
  updatedAt: string;
};
