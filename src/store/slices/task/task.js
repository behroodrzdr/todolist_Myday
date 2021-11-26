import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TaskDataService from '../../../services/task.service';

const initialState = {
  currentTaskData: {},
  isOpenForm: false,
  isOnedit: false,
};

export const createTask = createAsyncThunk(
  'task/create',
  async ({ title, description }) => {
    const res = await TaskDataService.create({ title, description });
    return res.data;
  },
);

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ id, title, description }) => {
    const res = await TaskDataService.update({ id, title, description });
    return res.data;
  },
);

export const deleteTask = createAsyncThunk('task/delete', async ({ id }) => {
  await TaskDataService.delete(id);
  return { id };
});

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTaskData: (state, action) => {
      state.currentTaskData = action.payload;
    },
    setOpenAddForm: (state) => {
      state.isOpenForm = true;
    },
    setCloseAddForm: (state) => {
      state.isOpenForm = false;
    },
    setIsOnedit: (state) => {
      state.isOnedit = !state.isOnedit;
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTask = (state) => state.currentTask.value;
export const { setCurrentTaskData, setOpenAddForm, setCloseAddForm ,setIsOnedit } =
  taskSlice.actions;

const { reducer } = taskSlice;
export default reducer;
