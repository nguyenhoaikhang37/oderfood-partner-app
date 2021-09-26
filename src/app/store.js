import foodReducer from 'features/Food/foodSlice';
import menuReducer from 'features/Menu/menuSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    food: foodReducer,
    menu: menuReducer,
  },
});

export default store;
