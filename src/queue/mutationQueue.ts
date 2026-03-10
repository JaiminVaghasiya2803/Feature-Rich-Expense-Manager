import { store } from '../store';
import {
  addToQueue,
  removeFromQueue,
  clearQueue as clearQueueRedux,
} from '../store/offlineQueueSlice';

let isReplaying = false;

export const initQueue = async () => {
  // Rehydration is handled by redux-persist
  // This can stay as a no-op or promise resolver
  return Promise.resolve();
};

export const enqueueMutation = async (mutation: any) => {
  store.dispatch(addToQueue(mutation));
};

export const dequeueMutation = async () => {
  store.dispatch(removeFromQueue());
};

export const getQueue = () => {
  return store.getState().offlineQueue.queue;
};

export const clearQueue = async () => {
  store.dispatch(clearQueueRedux());
};

export const getIsReplaying = () => isReplaying;
export const setIsReplaying = (value: boolean) => {
  isReplaying = value;
};
