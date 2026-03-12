import { ExpenseCategory } from '../types/expense';
import { theme } from './theme';

export interface CategoryConfig {
  id: ExpenseCategory;
  label: string;
  color: string;
  icon: string;
  description: string;
}

export const EXPENSE_CATEGORIES: CategoryConfig[] = [
  {
    id: 'food',
    label: 'Food & Dining',
    color: theme.colors.warning,
    icon: '🍽️',
    description: 'Restaurants, cafes, takeout',
  },
  {
    id: 'groceries',
    label: 'Groceries',
    color: '#10B981',
    icon: '🛒',
    description: 'Supermarket, fresh produce',
  },
  {
    id: 'transport',
    label: 'Transport',
    color: theme.colors.info,
    icon: '🚗',
    description: 'Gas, public transport, taxi',
  },
  {
    id: 'travel',
    label: 'Travel',
    color: '#8B5CF6',
    icon: '✈️',
    description: 'Flights, hotels, vacation',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    color: theme.colors.primaryLight,
    icon: '🛍️',
    description: 'General purchases, online shopping',
  },
  {
    id: 'clothing',
    label: 'Clothing',
    color: '#EC4899',
    icon: '👕',
    description: 'Clothes, shoes, accessories',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    color: theme.colors.secondary,
    icon: '🎬',
    description: 'Movies, games, subscriptions',
  },
  {
    id: 'health',
    label: 'Health & Fitness',
    color: '#EF4444',
    icon: '🏥',
    description: 'Medical, pharmacy, gym',
  },
  {
    id: 'education',
    label: 'Education',
    color: '#F59E0B',
    icon: '📚',
    description: 'Books, courses, training',
  },
  {
    id: 'utilities',
    label: 'Utilities',
    color: '#6B7280',
    icon: '💡',
    description: 'Electricity, water, internet',
  },
  {
    id: 'gifts',
    label: 'Gifts & Donations',
    color: '#F97316',
    icon: '🎁',
    description: 'Presents, charity, tips',
  },
  {
    id: 'other',
    label: 'Other',
    color: theme.colors.text.secondary,
    icon: '📝',
    description: 'Miscellaneous expenses',
  },
];

export const getCategoryConfig = (categoryId: ExpenseCategory): CategoryConfig => {
  return EXPENSE_CATEGORIES.find(cat => cat.id === categoryId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
};