import { memo, useEffect, useState } from 'react';

const Request = ({ url, method = 'GET', children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      const response = await fetch(url, { method });
      const json = await response.json();

      setData(json);
      setLoading(false);
    };

    request();
  }, []);

  return children({ loading, data });
};

export default memo(Request);
