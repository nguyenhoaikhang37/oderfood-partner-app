import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chooseApi from '../../apis/chooseApi';

export const fetchChooseList = createAsyncThunk('detail/fetchChooseList', async (userId) => {
  try {
    const res = await chooseApi.getChooseList(userId);
    return res.data;
  } catch (error) {
    console.log('Failed to fetch Choose List', error);
  }
});

const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    loading: false,
    chooseList: [],
  },
  reducers: {},
  extraReducers: {
    [fetchChooseList.pending]: (state) => {
      state.loading = true;
    },
    [fetchChooseList.fulfilled]: (state, action) => {
      state.loading = false;
      state.chooseList = action.payload.choose;
    },
  },
});

//REDUCER
const detailReducer = detailSlice.reducer;
export default detailReducer;
//SELECTOR
export const selectDetailLoading = (state) => state.detail.loading;
export const selectDetailList = (state) => state.detail.chooseList;
//ACTIONS
export const detailActions = detailSlice.actions;
