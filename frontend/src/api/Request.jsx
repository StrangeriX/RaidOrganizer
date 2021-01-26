import { memo, useEffect, useState } from 'react';
import { useIsAuthenticated } from './AuthenticationProvider';

const Request = ({ url, method = 'GET', children, variables }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');
  const { setIsAuthenticated } = useIsAuthenticated();
  const request = async (body) => {
    const input = {
      body: variables || body ? JSON.stringify(variables || body) : undefined,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    };
    setLoading(true);
    const response = await fetch(url, { method, ...input });
    if (response.status === 401) {
      setIsAuthenticated({ isAuthenticated: false });
      localStorage.removeItem('token');
    }
    if (method === 'POST') {
      const text = await response.text();
      setData(text);
    } else if (method === 'GET') {
      const json = await response.json();

      setData(json);
    } else {
      const text = await response.text();
      setData(text);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (method === 'GET') request();
  }, []);

  return children({
    loading,
    data,
    refetch: method === 'GET' ? request : null,
    mutate: method !== 'GET' ? request : null,
  });
};

export default memo(Request);
