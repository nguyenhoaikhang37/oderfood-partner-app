import userApi from '../../apis/userApi';
import { fetchChooseList } from '../Detail/detailSlice';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getUserToken = createAsyncThunk('login/getUserToken', async (token, thunkApi) => {
  try {
    const { data } = await userApi.layThongTinTaiKhoan(token);
    thunkApi.dispatch(fetchChooseList(data.restaurant._id));
    return data.restaurant;
  } catch (error) {
    console.log('Failed to get user token', error);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [getUserToken.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

//ACTIONS
export const loginActions = loginSlice.actions;
//SELECTOR
export const selectLoginUser = (state) => state.login.user;
//REDUCER
const loginReducer = loginSlice.reducer;
export default loginReducer;
