import menuApi from 'apis/menuApi';

const { createSlice, createSelector, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchMenuList = createAsyncThunk('menu/fetchMenuList', async () => {
  try {
    const res = await menuApi.getMenuList();
    return res.data;
  } catch (error) {
    console.log('Failed to fetch Menu List', error);
  }
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuList: [],
  },
  reducers: {},
  extraReducers: {
    [fetchMenuList.fulfilled]: (state, action) => {
      state.menuList = action.payload.menu;
    },
  },
});

//ACTIONS
export const menuActions = menuSlice.actions;
//SELECTOR
export const selectMenuList = (state) => state.menu.menuList;
export const selectMenuOptions = createSelector(selectMenuList, (menuList) =>
  menuList.map((menu) => ({
    label: menu.name,
    value: menu._id,
    restaurant: menu.restaurant,
  }))
);
//REDUCER
const menuReducer = menuSlice.reducer;
export default menuReducer;
