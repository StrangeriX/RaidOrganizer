import React, { memo, createContext, useState, useEffect, useContext } from 'react';

export const AuthenticationContext = createContext({
  isAuthenticated: false,
});

export const AuthenticationDispatchContext = createContext(null);

const logoutRequest = () => {
  const token = localStorage.getItem('token');
  fetch('http://127.0.0.1:8000/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  }).then((response) => response.json());
};

export const useIsAuthenticated = () => {
  const setIsAuthenticated = useContext(AuthenticationDispatchContext);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const logout = () => {
    setIsAuthenticated({ isAuthenticated: false });
    logoutRequest();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };
  return { isAuthenticated, setIsAuthenticated, logout };
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
