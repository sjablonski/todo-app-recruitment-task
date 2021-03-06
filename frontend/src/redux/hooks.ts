import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState, AppDispatch } from './store';

type ReturnAppDispatch = ThunkDispatch<RootState, null, AnyAction> &
  ThunkDispatch<RootState, undefined, AnyAction> &
  Dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ReturnAppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
