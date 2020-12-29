import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layout/Header';
import Request from '../api/Request';
import Authenticated from '../api/Authenticated';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Authenticated>
          <Request url="http://127.0.0.1:8000/api/guild/list">
            {({ loading, data }) => {
              if (loading || !data) return <span>loading...</span>;
              console.log(data);
              return data?.map((element) => {
                console.log(element);
                return <span>{element?.guild_name}</span>;
              });
            }}
          </Request>
        </Authenticated>
      </Router>
    );
  }
}
