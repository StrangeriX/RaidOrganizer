import React, { memo, createContext, useState, useEffect, useContext } from 'react';

export const AuthenticationContext = createContext({
  isAuthenticated: false,
});

export const AuthenticationDispatchContext = createContext(null);

export const useIsAuthenticated = () => {
  const setIsAuthenticated = useContext(AuthenticationDispatchContext);
  const { isAuthenticated } = useContext(AuthenticationContext);

  return { isAuthenticated, setIsAuthenticated };
};

const AuthenticationProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    setState({ isAuthenticated: !!token });
  }, []);

  return (
    <AuthenticationDispatchContext.Provider value={setState}>
      <AuthenticationContext.Provider value={state}>{children}</AuthenticationContext.Provider>;
    </AuthenticationDispatchContext.Provider>
  );
};

export default memo(AuthenticationProvider);
