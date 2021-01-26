import { memo, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthenticationContext } from './AuthenticationProvider';

const Authenticated = ({ children }) => {
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, []);
  return isAuthenticated && children;
};

export default memo(Authenticated);
