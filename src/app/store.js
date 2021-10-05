import foodReducer from '../features/Food/foodSlice';
import loginReducer from '../features/Login/loginSlice';
import menuReducer from '../features/Menu/menuSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    food: foodReducer,
    menu: menuReducer,
    login: loginReducer,
  },
});

export default store;
