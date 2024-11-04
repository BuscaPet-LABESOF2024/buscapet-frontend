import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken_] = useState(localStorage.getItem('token'));
  const [username, setUsername_] = useState(localStorage.getItem('username'));

  const setToken = (newToken: string) => {
    setToken_(newToken);

    if (newToken) {
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const setUsername = (newUsername: string) => {
    setUsername_(newUsername);

    if (newUsername) {
      localStorage.setItem('username', newUsername);
    } else {
      localStorage.removeItem('username');
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      username,
      setUsername,
    }),
    [token, username]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
