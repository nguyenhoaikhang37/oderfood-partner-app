import PartnerLayout from './components/Layout/PartnerLayout';
import Login from './features/Login';
import { getUserToken } from './features/Login/loginSlice';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import './index.css';
import 'tailwindcss/tailwind.css';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(getUserToken(token));
  }, []);

  return (
    <Fragment>
      <Switch>
        <Redirect exact from="/" to="/admin/profile" />
        <Route path="/admin">
          <PartnerLayout />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
