import { AxiosError } from 'axios';
import axios from '../api';
import { GetAnnouncementsWithFilterParams } from './hooks';

export const AnnouncementApi = {
  async getAnnouncementsWithFilter({
    filters,
    pageNumber = 0,
    size = 8,
  }: GetAnnouncementsWithFilterParams): Promise<PageableContent<AnnouncementResponse>> {
    const { data } = await axios.post('/announcement/search', filters, {
      params: { pageNumber, size },
    });
    return data;
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

export type PageableContent<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
}

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

export interface IAnnouncementDetailsBase {
  id: number;
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  images: ImagesResponse[];
  announcementType: AnnouncementType;
  active: boolean;
  address?: {
    street?: string;
    cep?: string;
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

export const updateAnnouncement = async (
  announcementData: AnnouncementDetails
): Promise<void> => {
  try {
    console.log('Dados enviados:', JSON.stringify(announcementData, null, 2));

    const response = await axios.put(`announcement/update-announcement`, {
      ...announcementData,
    });

    console.log('Resposta do servidor:', response.data);
    console.log('Anúncio atualizado com sucesso!');
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Erro Axios:', error.message);
      console.error('Código de erro:', error.code);
      console.error('Resposta do servidor:', error.response?.data);
    } else {
      console.error('Erro desconhecido:', error);
    }
    throw error;
  }
};

export const deleteAnnouncement = async (
  announcementId: number
): Promise<void> => {
  try {
    await axios.put(`/announcement/deactivate-announcement/${announcementId}`);
    console.log('Anuncio deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar o anuncio:', error);
    throw error;
  }
};
