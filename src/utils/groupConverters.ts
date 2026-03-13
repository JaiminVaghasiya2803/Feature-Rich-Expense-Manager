import { ExpenseGroup, GroupMember } from '../types/expense';
import { BillGroup, Person } from '../types/billSplit';

/**
 * Convert ExpenseGroup to BillGroup for bill splitting functionality
 */
export const convertExpenseGroupToBillGroup = (expenseGroup: ExpenseGroup): BillGroup => {
  return {
    id: expenseGroup.id.toString(),
    name: expenseGroup.name,
    description: expenseGroup.description || '',
    members: expenseGroup.members?.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      avatar: member.avatar,
      color: member.color || '#6366F1',
    })) || [],
    expenses: [], // Will be loaded separately when needed
    currency: expenseGroup.currency || 'INR',
    createdAt: new Date(expenseGroup.createdAt),
    updatedAt: new Date(expenseGroup.updatedAt),
    color: expenseGroup.color,
  };
};

/**
 * Convert BillGroup to ExpenseGroup for API storage
 */
export const convertBillGroupToExpenseGroup = (billGroup: BillGroup): ExpenseGroup => {
  return {
    id: billGroup.id,
    name: billGroup.name,
    description: billGroup.description,
    color: billGroup.color || '#6366F1',
    currency: billGroup.currency,
    members: billGroup.members.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      avatar: member.avatar,
      color: member.color,
    })),
    createdAt: billGroup.createdAt.toISOString(),
    updatedAt: billGroup.updatedAt.toISOString(),
  };
};

/**
 * Convert Person to GroupMember
 */
export const convertPersonToGroupMember = (person: Person): GroupMember => {
  return {
    id: person.id,
    name: person.name,
    email: person.email,
    avatar: person.avatar,
    color: person.color,
  };
};

/**
 * Convert GroupMember to Person
 */
export const convertGroupMemberToPerson = (member: GroupMember): Person => {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    avatar: member.avatar,
    color: member.color || '#6366F1',
  };
};