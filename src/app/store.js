import comboReducer from '../features/Combo/comboSlice';
import detailReducer from '../features/Detail/detailSlice';
import discountReducer from '../features/Discount/discountSlice';
import foodReducer from '../features/Food/foodSlice';
import loginReducer from '../features/Login/loginSlice';
import menuReducer from '../features/Menu/menuSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    food: foodReducer,
    menu: menuReducer,
    login: loginReducer,
    detail: detailReducer,
    discount: discountReducer,
    combo: comboReducer,
  },
});

export default store;
