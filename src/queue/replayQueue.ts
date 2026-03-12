import {
  getQueue,
  dequeueMutation,
  getIsReplaying,
  setIsReplaying,
} from './mutationQueue';
import { addExpense, updateExpense, deleteExpense } from '../api/expense.api';
import { apiClient } from '../api/client';
import { QueueActionType } from '../constants/queueTypes';

export const replayQueue = async () => {
  if (getIsReplaying()) return;

  setIsReplaying(true);

  try {
    let queue = getQueue();

    while (queue.length > 0) {
      const mutation = queue[0];

      try {
        switch (mutation.type) {
          case QueueActionType.ADD_EXPENSE:
            await addExpense(mutation.payload);
            break;

          case QueueActionType.UPDATE_EXPENSE:
            await updateExpense(mutation.payload.id, mutation.payload);
            break;

          case QueueActionType.DELETE_EXPENSE:
            await deleteExpense(mutation.payload.id);
            break;

          case 'CREATE_GROUP':
            await apiClient.post('/groups', mutation.data);
            break;

          case 'UPDATE_GROUP':
            await apiClient.patch(`/groups/${mutation.data.id}`, mutation.data.updates);
            break;

          case 'DELETE_GROUP':
            await apiClient.delete(`/groups/${mutation.data.id}`);
            break;

          default:
            break;
        }

        await dequeueMutation();
        queue = getQueue();
      } catch (error) {
        if (__DEV__) {
          console.log('Replay failed for mutation:', mutation, 'Error:', error);
        }
        break;
      }
    }
  } finally {
    setIsReplaying(false);
  }
};
