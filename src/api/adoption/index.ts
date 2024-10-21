import axios from '../api';
import type { AdoptionFormSchema } from '../../components/adoption/type';

export const AdoptionApi = {
  async createAdoption(payload: AdoptionFormSchema) {
    const { data } = await axios.post('/announcement/new-adoption-announcement', payload);
    return data;
  },

  async fetchAdoptions() {
    const { data } = await axios.get('/adoptions');
    return data;
  },
};
