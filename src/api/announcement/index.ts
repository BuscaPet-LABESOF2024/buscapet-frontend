import axios from '../api';
import { GetAnnouncementsWithFilterParams } from './hooks';



export const AnnouncementApi = {
  async getAnnouncementsWithFilter({
    filters,
    pageNumber = 0,
    size = 10,
  }: GetAnnouncementsWithFilterParams): Promise<AnnouncementResponse[]> {
    const { data } = await axios.post('/announcement/search', filters, {
      params: { pageNumber, size },
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
  async getMyAnnouncements(): Promise<AnnouncementResponse[]> {
    const { data } = await axios.get('/announcement/my-announcements');
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
