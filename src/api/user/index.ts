import { AxiosRequestConfig } from 'axios';
import {
  IGetUser,
  IUserDataAddressUpdate,
  IUserDataProfile,
  IUserDataProfileUpdate,
  type ICreateNewUser,
} from './hooks';
import api from '../api';


export const UserApi = {
  async getUser(payload: IGetUser) {
    const { userId } = payload;

    const { data } = await api.get(`/user/${userId}`);

    return data;
  },
  async createNewUser(payload: ICreateNewUser) {
    const { data } = await api.post('/auth/signup', payload);

    return data;
  },

  async getUserData(token: string): Promise<IUserDataProfile> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.get(`/user/profile`, config);

    return data;
  },

  async updateUserData(token: string, payload: IUserDataProfileUpdate) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.put(`/user/update-user`, payload, config);

    return data;
  },

  async updateAddressData(token: string, payload: IUserDataAddressUpdate) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.put(
      `/address/update-address`,
      payload,
      config
    );

    return data;
  },
};
