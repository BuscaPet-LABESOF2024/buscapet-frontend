import axios from 'axios';
import { IGetUser } from './hooks';

export const UserApi = {
  async getUser(payload: IGetUser) {
    const { userId } = payload;

    const { data } = await axios.get(`/user/${userId}`);

    return data;
  },
};
