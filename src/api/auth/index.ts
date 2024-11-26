import api from '../api';
import type { LoginPayload } from './types';

export const AuthApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },
};
