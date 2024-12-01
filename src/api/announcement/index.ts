import api from '../api';
import { FilterFormData } from '../Filters';
import { CreateAdoptionAnnouncementPayload, CreateLostAnnouncementPayload } from './types';

export const AnnouncementApi = {
  async getAnnouncementsWithFilter(
    filters: FilterFormData,
    pageNumber: number = 0
  ): Promise<AnnouncementResponse[]> {
    const { data } = await api.post('/announcement/search', filters, {
      params: { pageNumber },
    });
    return data.content;
  },
  async getAnnouncements(): Promise<AnnouncementResponse[]> {
    const { data } = await api.get('/announcement/all-announcement');
    return data;
  },
  async createAdoption(payload: CreateAdoptionAnnouncementPayload) {
    const { data } = await api.post(
      '/announcement/new-adoption-announcement',
      payload
    );
    console.log('Resposta da API:', data);
    return data;
  },

  async fetchAdoptions() {
    const { data } = await api.get('/adoptions');
    return data;
  },

  async createLostAnnouncement(payload: CreateLostAnnouncementPayload) {
    const { data } = await api.post('/announcement/new-lost-announcement', payload);
    console.log('Resposta da API:', data);
    return data;
  },
  async getMyAnnouncements(): Promise<AnnouncementResponse[]> {
    const { data } = await axios.get('/announcement/my-announcements')
    return data
  },
};

export interface AnnouncementResponse {
  id: number;
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  animal: AnimalResponse;
  user: UserResponse;
  announcementType: AnnouncementTypeResponse;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  images: ImagesResponse[];
}

interface AnimalResponse {
  id: number;
  name: string;
  statusAnimal: number;
  type: string;
  breed: string;
  size: number;
  weight: number;
  age: number;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AnnouncementTypeResponse {
  id: number;
  description: string;
}

interface ImagesResponse {
  id: number;
  image: string | null;
}
