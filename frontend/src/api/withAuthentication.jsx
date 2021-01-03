import React, { useContext } from 'react';
import { AuthenticationContext, AuthenticationDispatchContext } from './AuthenticationProvider';

export default (WrappedComponent) => {
  return (props) => {
    const setIsAuthenticated = useContext(AuthenticationDispatchContext);
    const { isAuthenticated } = useContext(AuthenticationContext);

    return (
      <WrappedComponent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        {...props}
      />
    );
  };
};
