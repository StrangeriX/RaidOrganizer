import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Authenticated from '../api/Authenticated';
import Request from '../api/Request';
import Login from '../views/Login';
import Register from '../views/Register';
import Header from './layout/Header';

const Routes = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Authenticated>
        <Route exact path="/home">
          <span>Hello home</span>
        </Route>
      </Authenticated>
    </Switch>
  </>
);

export default memo(Routes);
