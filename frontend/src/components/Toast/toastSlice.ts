import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export type Status = 'success' | 'error' | undefined;

interface ToastState {
  isOpen: boolean;
  status: Status;
  message: string;
}

const initialState: ToastState = {
  isOpen: false,
  status: undefined,
  message: '',
};

export const toastSlice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.isOpen = true;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    clearSnackbar: (state) => {
      state.isOpen = false;
      state.status = undefined;
      state.message = '';
    },
  },
});

export const { showSnackbar, clearSnackbar } = toastSlice.actions;

export const selectToastState = (state: RootState): ToastState => state.toast;

export default toastSlice.reducer;
