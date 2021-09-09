import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoTaskReducer from 'pages/Todo/todoTaskSlice';
import toastReducer from 'components/Toast/toastSlice';

export const store = configureStore({
  reducer: {
    todoTasks: todoTaskReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
