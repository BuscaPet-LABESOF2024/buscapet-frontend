import axios from '../api';
import { FilterFormData } from '../Filters';

export const AnnouncementApi = {
  async getAnnouncementsWithFilter(
    filters: FilterFormData,
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

export interface ImagesResponse {
  id: number;
  image: string | null;
}

export enum AnimalSize {
  Small = 1,
  Medium = 2,
  Large = 3,
}

export enum AnnouncementType {
  Lost = 1,
  Found = 2,
  Adoption = 3,
}

// Interface genérica para os detalhes de um anuncio
export interface IAnnouncementDetailsBase {
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  images: ImagesResponse[];
  announcementType: AnnouncementType;
  active: boolean;
  address: {
    street: string;
    neighborhood?: string;
    reference?: string;
    complemento?: string;
  };
}

export interface IAdoptionAnnouncementDetails extends IAnnouncementDetailsBase {
  animal: {
    name: string;
    type: string;
    breed: string;
    size: AnimalSize;
    weight: number;
    age: number;
  };
}

export interface IMissingOrFoundAnnouncementDetails
  extends IAnnouncementDetailsBase {
  animal: {
    name: string;
    type: string;
    breed: string;
    size: AnimalSize;
  };
}

export type AnnouncementDetails =
  | IAdoptionAnnouncementDetails
  | IMissingOrFoundAnnouncementDetails;

export const fetchAnnouncementDetails = async (
  id: number
): Promise<AnnouncementDetails> => {
  try {
    const response = await axios.get(`/announcement/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os detalhes do anúncio:', error);
    throw error;
  }
};
