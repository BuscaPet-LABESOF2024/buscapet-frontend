import axios from '../api';
import type { LoginPayload } from './types';

export const AuthApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await axios.post('/auth/login', payload);
    return data;
  },
};
