import axios from '../api';

export const AnnouncementApi = {
  async getAnnouncements(): Promise<AnnouncementResponse[]> {
    const { data } = await axios.get('/announcement/all-announcement');
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
  images: ImagesResponse[]; // Permitir null
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
