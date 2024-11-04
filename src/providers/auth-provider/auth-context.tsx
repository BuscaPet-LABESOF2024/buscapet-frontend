import { createContext } from 'react';

interface User {
  name: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
  username: User['name'] | null;
  setUsername: (newUsername: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);
