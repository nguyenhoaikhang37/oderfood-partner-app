import PartnerLayout from './components/Layout/PartnerLayout';
import Login from './features/Login';
import { getUserToken } from './features/Login/loginSlice';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import './index.css';
import 'tailwindcss/tailwind.css';
import { fetchDiscountList, fetchFoodDiscount } from './features/Discount/discountSlice';
import { fetchComboList } from './features/Combo/comboSlice';
import { fetchMenuList } from './features/Menu/menuSlice';
import Invoice from './components/Common/Invoice';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessTokenPartner');

  useEffect(() => {
    dispatch(getUserToken(token));
    dispatch(fetchFoodDiscount());
    dispatch(fetchDiscountList());
    dispatch(fetchComboList());
    dispatch(fetchMenuList());
  }, []);

  return (
    <Fragment>
      <Switch>
        <Redirect exact from="/" to="/admin/profile" />
        <Route path="/admin">
          <PartnerLayout />
        </Route>
        <Route path="/invoice">
          <Invoice />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
