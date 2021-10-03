import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
function useAuth() {
  const [userLoggedIn, setUserLoggedIn] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUserLoggedIn(user);
      } else {
        setUserLoggedIn(null);
      }
    }
  }, []);
  return { userLoggedIn };
}

export default useAuth;
