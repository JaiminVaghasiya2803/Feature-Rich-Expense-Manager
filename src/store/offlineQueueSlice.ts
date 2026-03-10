import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueueItem = {
  type: string;
  payload: any;
};

type OfflineQueueState = {
  queue: QueueItem[];
};

const initialState: OfflineQueueState = {
  queue: [],
};

const offlineQueueSlice = createSlice({
  name: 'offlineQueue',
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<QueueItem>) => {
      state.queue.push(action.payload);
    },

    removeFromQueue: state => {
      state.queue.shift();
    },

    clearQueue: state => {
      state.queue = [];
    },
  },
});

export const { addToQueue, removeFromQueue, clearQueue } =
  offlineQueueSlice.actions;

export default offlineQueueSlice.reducer;
