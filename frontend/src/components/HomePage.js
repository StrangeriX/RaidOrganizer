import React, { Component } from 'react';
import GuildPage from "./GuildPage";
import CreateGuildPage from "./CreateGuildPage";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
export default class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <p>This is a Home Page</p>
                    </Route>
                    <Route path='/guild' component={GuildPage} />
                    <Route path='/create' component={CreateGuildPage} />
                </Switch>
        </Router>);
    }
}