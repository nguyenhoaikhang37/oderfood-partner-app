import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/global';
import Combo from '../../features/Combo';
import Detail from '../../features/Detail';
import Discount from '../../features/Discount';
import Food from '../../features/Food';
import { getUserToken } from '../../features/Login/loginSlice';
import Menu from '../../features/Menu';
import Profile from '../../features/Profile';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';

const PartnerLayout = ({ children }) => {
  const isLogin = Boolean(localStorage.getItem(ACCESS_TOKEN));
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserToken(token));
  }, []);

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
            <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
              {/* Sidebar */}
              <Sidebar />
              {children}
            </div>
          </div>
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            {/* Header */}
            <Header />
            <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
              <Switch>
                <Route path="/admin/profile">
                  <Profile />
                </Route>

                <Route path="/admin/menu">
                  <Menu />
                </Route>

                <Route path="/admin/food">
                  <Food />
                </Route>

                <Route path="/admin/combo">
                  <Combo />
                </Route>

                <Route path="/admin/detail">
                  <Detail />
                </Route>

                <Route path="/admin/discount">
                  <Discount />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default PartnerLayout;
