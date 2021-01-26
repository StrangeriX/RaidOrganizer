import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticated from '../api/Authenticated';
import Footer from './common/Footer/Footer';
import GuildDetail from '../views/Guilds/GuildDetail/GuildDetail';
import Guilds from '../views/Guilds/Guilds';
import Home from '../views/Home/Home';
import Login from '../views/Login';
import RaidDetail from '../views/Raids/RaidDetail/RaidDetail';
import Register from '../views/Register';
import WelcomePage from '../views/WelcomePage/WelcomePage';
import Header from './layout/Header';

const Routes = () => (
  <Route path="/">
    <Header />
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/guilds" render={() => <Guilds />} />
      <Route exact path="/">
        <>
          <WelcomePage />
        </>
      </Route>
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
    <Footer />
  </Route>
);

export default memo(Routes);
