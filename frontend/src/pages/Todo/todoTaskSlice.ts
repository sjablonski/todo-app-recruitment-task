import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import backendAPI from 'api/backend';
import { RootState } from 'redux/store';
import TodoTask from 'interfaces/TodoTask';
import TodoTaskForm from 'interfaces/TodoTaskForm';
import QueryParams from 'interfaces/QueryParams';

interface FieldsErrors {
  title: string;
  description: string;
}

interface ValidationErrors {
  errors: FieldsErrors;
}

export interface TodoTasksState {
  isPending: boolean;
  counter: number;
  rows: TodoTask[];
}

const initialState: TodoTasksState = {
  isPending: false,
  counter: 0,
  rows: [],
};

export const fetchTodoTasks = createAsyncThunk(
  'todoTasks/fetchTodoTasks',
  async (params: QueryParams) => {
    const { data } = await backendAPI.get(`/todo-tasks`, { params });
    return data;
  },
);

export const addNewTodoTasks = createAsyncThunk<
  TodoTask,
  TodoTaskForm,
  { rejectValue: ValidationErrors }
>('todoTasks/addNewTodoTasks', async (task: TodoTaskForm, { rejectWithValue }) => {
  try {
    const { data } = await backendAPI.post<TodoTask>(`/todo-task`, task);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        return rejectWithValue(err.response.data as ValidationErrors);
      }
    }
    throw err;
  }
});

export const updateTodoTask = createAsyncThunk(
  'todoTasks/updateTodoTask',
  async (task: TodoTask) => {
    const { data } = await backendAPI.put<TodoTask>(`/todo-task/${task._id}`, task);
    return data;
  },
);

export const deleteTodoTask = createAsyncThunk('todoTasks/deleteTodoTask', async (id: string) => {
  await backendAPI.delete(`/todo-task/${id}`);
  return id;
});

export const todoTaskSlice = createSlice({
  name: 'todoTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodoTasks.fulfilled, (state, action) => {
      state.counter = action.payload.count;
      state.rows = action.payload.rows;
    });
    builder.addCase(addNewTodoTasks.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(addNewTodoTasks.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(addNewTodoTasks.fulfilled, (state, action) => {
      state.isPending = false;
      state.counter += 1;
      state.rows.push(action.payload);
    });
    builder.addCase(updateTodoTask.fulfilled, (state, action) => {
      const taskIndex = state.rows.findIndex((row) => row._id === action.payload._id);
      state.rows[taskIndex] = action.payload;
    });
    builder.addCase(deleteTodoTask.fulfilled, (state, action) => {
      state.rows = state.rows.filter((row) => row._id !== action.payload);
    });
  },
});

export const selectTodoTasks = (state: RootState): TodoTask[] => state.todoTasks.rows;

export const selectNumberOfPages = (state: RootState): number => {
  const counter = state.todoTasks.counter;
  return counter % 10 === 0 ? Math.floor(counter / 10) : Math.floor(counter / 10) + 1;
};

export const selectPending = (state: RootState): boolean => state.todoTasks.isPending;

export default todoTaskSlice.reducer;
