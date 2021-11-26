import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ListDataService from '../../../services/list.service';

const initialState = {
  data: [],
};

export const getAllListAsync = createAsyncThunk('lists/retrieve', async () => {
  const res = await ListDataService.getAll();
  return res.data.tasks;
});

const listSlice = createSlice({
  name: 'list',
  initialState,
  extraReducers: {
    [getAllListAsync.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});
const { reducer } = listSlice;
export default reducer;
