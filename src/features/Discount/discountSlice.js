import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import discountApi from '../../apis/discountApi';

export const fetchFoodDiscount = createAsyncThunk('discount/fetchFoodDiscount', async () => {
  try {
    const res = await discountApi.getFoodDiscount();
    return res.data.food;
  } catch (error) {
    console.log('🚀 ~ file: discountSlice.js ~ line 7 ~ fetchFoodDiscount ~ error', error);
  }
});

export const fetchDiscountList = createAsyncThunk('discount/fetchDiscountList', async () => {
  try {
    const res = await discountApi.getDiscountList();
    return res.data.discount;
  } catch (error) {
    console.log('🚀 ~ file: discountSlice.js ~ line 18 ~ fetchDiscountList ~ error', error);
  }
});

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    loading: false,
    foodDiscount: [],
    discountList: [],
  },
  reducers: {},
  extraReducers: {
    [fetchFoodDiscount.fulfilled](state, action) {
      state.foodDiscount = action.payload;
    },
    [fetchDiscountList.pending](state) {
      state.loading = true;
    },
    [fetchDiscountList.fulfilled](state, action) {
      state.loading = false;
      state.discountList = action.payload;
    },
  },
});

//REDUCER
const discountReducer = discountSlice.reducer;
export default discountReducer;
//SELECTOR
export const selectDiscountLoading = (state) => state.discount.loading;
export const selectDiscountFood = (state) => state.discount.foodDiscount;
export const selectDiscountList = (state) => state.discount.discountList;
//ACTIONS
export const discountActions = discountSlice.actions;
