import type { FilterFormSchemaType } from '@/components/all-announcements/types';
import axios from '../api';

export const AnnouncementApi = {
  async getAnnouncementsWithFilter(
    filters: FilterFormSchemaType,
    pageNumber: number = 0
  ): Promise<AnnouncementResponse[]> {
    const { data } = await axios.post('/announcement/search', filters, {
      params: { pageNumber },
    });
    return data.content;
  },
  async getAnnouncements(): Promise<AnnouncementResponse[]> {
    const { data } = await axios.get('/announcement/all-announcement');
    return data;
  },
  async getLastAnnouncements(): Promise<AnnouncementResponse[]> {
    const { data } = await axios.get('/announcement/last-announcements');
    return data;
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
