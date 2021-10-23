import userApi from '../../apis/userApi';
import { fetchChooseList } from '../Detail/detailSlice';
import { fetchFoodList } from '../Food/foodSlice';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getUserToken = createAsyncThunk('login/getUserToken', async (token, thunkApi) => {
  try {
    const { data } = await userApi.layThongTinTaiKhoan(token);
    thunkApi.dispatch(fetchChooseList(data.restaurant._id));
    thunkApi.dispatch(fetchFoodList(data.restaurant._id));
    return data.restaurant;
  } catch (error) {
    console.log('Failed to get user token', error);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    user: {},
  },
  reducers: {},
  extraReducers: {
    [getUserToken.pending]: (state) => {
      state.loading = true;
    },
    [getUserToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

//ACTIONS
export const loginActions = loginSlice.actions;
//SELECTOR
export const selectLoginUser = (state) => state.login.user;
export const selectLoginLoading = (state) => state.login.loading;
//REDUCER
const loginReducer = loginSlice.reducer;
export default loginReducer;
