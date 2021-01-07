import React, { memo } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Authenticated from '../api/Authenticated';
import GuildDetail from '../views/Guilds/GuildDetail/GuildDetail';
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

      <Authenticated>
        <Route path="/home">
          <>
            <Home />
          </>
        </Route>
        <Route path="/guild/:guildid" component={GuildDetail} />
      </Authenticated>
    </Switch>
  </Route>
);

export default memo(Routes);
