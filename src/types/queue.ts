import { Expense } from './expense';

export type QueueActionType =
  | 'ADD_EXPENSE'
  | 'UPDATE_EXPENSE'
  | 'DELETE_EXPENSE';

export type QueueItem = {
  type: QueueActionType;
  payload: Partial<Expense>;
};
