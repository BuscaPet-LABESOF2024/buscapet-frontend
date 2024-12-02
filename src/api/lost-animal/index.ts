import axios from '../api';
import { CreateLostAnnouncementPayload } from './types';

export const LostApi = {
  async createLostAnnouncement(payload: CreateLostAnnouncementPayload) {
    const { data } = await axios.post('/announcement/new-lost-announcement', payload);
    console.log('Resposta da API:', data);
    return data;
  },

};
