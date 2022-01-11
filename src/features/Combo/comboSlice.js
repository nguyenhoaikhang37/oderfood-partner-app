import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import comboApi from '../../apis/comboApi';

export const fetchComboList = createAsyncThunk('combo/fetchComboList', async () => {
  try {
    const res = await comboApi.getCombo();
    return res.data.combo;
  } catch (error) {
    console.log('🚀 ~ file: comboSlice.js ~ line 8 ~ fetchComboList ~ error', error);
  }
});

const comboSlice = createSlice({
  name: 'combo',
  initialState: {
    loading: false,
    comboList: [],
  },
  reducers: {},
  extraReducers: {
    [fetchComboList.pending](state) {
      state.loading = true;
    },
    [fetchComboList.fulfilled](state, action) {
      state.loading = false;
      state.comboList = action?.payload?.filter((x) => x);
    },
  },
});

//REDUCER
const comboReducer = comboSlice.reducer;
export default comboReducer;
//SELECTOR
export const selectComboLoading = (state) => state.combo.loading;
export const selectComboList = (state) => state.combo.comboList;
//ACTIONS
export const comboActions = comboSlice.actions;
