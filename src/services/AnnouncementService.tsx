import axios from 'axios';
import { Announcement } from '../models/Announcement';

const API_URL = 'http://localhost:8080/announcement';

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
    try {
      const response = await axios.get(`${API_URL}/all-announcement`);
      console.log(response.data); // Verifique o que está sendo retornado aqui
      return response.data; // Retorna todos os anúncios
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
      throw error;
    }
  };

