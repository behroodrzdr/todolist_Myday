import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../store/slices/list/list';
import taskReducer from '../store/slices/task/task';

export const store = configureStore({
  reducer: {
    taskReducer: taskReducer,
    listReducer: listReducer,
  },
  devTools: true,
});
