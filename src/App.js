import PartnerLayout from 'components/Layout/PartnerLayout';
import Login from 'features/Login';
import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';

function App() {
  return (
    <Fragment>
      <Switch>
        <Redirect exact from="/" to="/admin" />
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
