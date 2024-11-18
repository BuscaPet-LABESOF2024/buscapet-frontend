import { AxiosRequestConfig } from 'axios';
import axios from '../api';
import {
  IGetUser,
  IUserDataAddressUpdate,
  IUserDataProfile,
  IUserDataProfileUpdate,
  type ICreateNewUser,
} from './hooks';

export const UserApi = {
  async getUser(payload: IGetUser) {
    const { userId } = payload;

    const { data } = await axios.get(`/user/${userId}`);

    return data;
  },
  async createNewUser(payload: ICreateNewUser) {
    const { data } = await axios.post('/auth/signup', payload);

    return data;
  },

  async getUserData(token: string): Promise<IUserDataProfile> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/user/profile`, config);

    return data;
  },

  async updateUserData(token: string, payload: IUserDataProfileUpdate) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/user/update-user`, payload, config);

    return data;
  },

  async updateAddressData(token: string, payload: IUserDataAddressUpdate) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/address/update-address`,
      payload,
      config
    );

    return data;
  },
};
