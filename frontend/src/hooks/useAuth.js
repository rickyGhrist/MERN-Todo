import { useEffect, useState } from 'react';
import axios from 'axios';

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await axios.get('/api/auth/is_logged_in');
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const callAuth = async () => {
      const data = await verifyAuth();
      setAuth(data);
    };

    callAuth();
  });

  return { auth };
};
