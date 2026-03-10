import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  undoDeleteId: number | null;
};

const initialState: UIState = {
  undoDeleteId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUndoDelete: (state, action: PayloadAction<number | null>) => {
      state.undoDeleteId = action.payload;
    },
  },
});

export const { setUndoDelete } = uiSlice.actions;

export default uiSlice.reducer;
