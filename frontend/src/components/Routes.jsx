import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticated from '../api/Authenticated';
import Guild from '../views/Guild/Guild';
import Home from '../views/Home/Home';

import Login from '../views/Login';
import Register from '../views/Register';
import Header from './layout/Header';

const Routes = () => (
  <Route path="/">
    <Header />
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/guild" render={() => <Guild />} />
      <Authenticated>
        <Route path="/home">
          <>
            <Home />
          </>
        </Route>
      </Authenticated>
    </Switch>
  </Route>
);

export default memo(Routes);
