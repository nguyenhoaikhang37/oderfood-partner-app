import foodApi from '../../apis/foodApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchFoodList = createAsyncThunk('food/fetchFoodList', async () => {
  try {
    const res = await foodApi.getFoodList();
    return res.data;
  } catch (error) {
    console.log('Failed to fetch Food List', error);
  }
});

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    loading: false,
    foodList: [],
  },
  reducers: {},
  extraReducers: {
    [fetchFoodList.pending]: (state) => {
      state.loading = true;
    },
    [fetchFoodList.fulfilled]: (state, action) => {
      state.loading = false;
      state.foodList = action.payload?.food;
    },
  },
});

//ACTIONS
export const foodActions = foodSlice.actions;
//SELECTOR
export const selectFoodList = (state) => state.food.foodList;
export const selectFoodLoading = (state) => state.food.loading;
//REDUCER
const foodReducer = foodSlice.reducer;
export default foodReducer;
