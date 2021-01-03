import React, { Component, memo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import Header from './layout/Header';
import AuthenticationProvider from '../api/AuthenticationProvider';

const App = () => (
  <AuthenticationProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </AuthenticationProvider>
);

export default memo(App);
