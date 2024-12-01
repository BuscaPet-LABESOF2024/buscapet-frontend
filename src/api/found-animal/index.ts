import axios from '../api';
import { CreateFoundAnnouncementPayload } from './types';

export const FoundApi = {
  async createFoundAnnouncement(payload: CreateFoundAnnouncementPayload) {
    const { data } = await axios.post('/announcement/new-found-announcement', payload);
    console.log('Resposta da API:', data);
    return data;
  },

};
