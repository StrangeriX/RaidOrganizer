import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticated from '../api/Authenticated';
import GuildDetail from '../views/Guilds/GuildDetail/GuildDetail';
import Guilds from '../views/Guilds/Guilds';
import Home from '../views/Home/Home';
import Login from '../views/Login';
import RaidDetail from '../views/Raids/RaidDetail/RaidDetail';
import Register from '../views/Register';
import Header from './layout/Header';

const Routes = () => (
  <Route path="/">
    <Header />
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/guilds" render={() => <Guilds />} />

      <Authenticated>
        <Route path="/home">
          <>
            <Home />
          </>
        </Route>
        <Route exact path="/guild/:guildid" component={GuildDetail} />
        <Route exact path="/raid/:raidid" component={RaidDetail} />
      </Authenticated>
    </Switch>
  </Route>
);

export default memo(Routes);
