import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/appConstants';

export const loadQueue = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveQueue = async (queue: unknown[]) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.OFFLINE_QUEUE,
      JSON.stringify(queue),
    );
  } catch (e) {
    if (__DEV__) {
      console.log('Queue save failed', e);
    }
  }
};

export const clearQueueStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
};
