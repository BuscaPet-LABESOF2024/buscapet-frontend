import { useState } from 'react';
import axios from 'axios';
import type { AdoptionFormSchema } from '../../components/adoption/type';

interface UseCreateAdoptionAnnouncementResult {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  createAdoptionAnnouncement: (data: AdoptionFormSchema) => Promise<void>;
}

export const useCreateAdoptionAnnouncement = (
  userId: number,
  announcementTypeId: number
): UseCreateAdoptionAnnouncementResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const createAdoptionAnnouncement = async (data: AdoptionFormSchema) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const formData = new FormData();
      
      // Adicionar campos no FormData
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('contact_phone', data.contact_phone);
      formData.append('user', JSON.stringify({ id: userId }));
      formData.append('announcementType', JSON.stringify({ id: announcementTypeId }));
      
      // Adicionar dados do animal
      formData.append('animal', JSON.stringify({
        name: data.animal.name,
        statusAnimal: 3, // Status fixo para adoção
        type: data.animal.type,
        breed: data.animal.breed,
        size: data.animal.size, // Atualizado conforme o seu schema
        weight: data.animal.weight,
        age: data.animal.age,
      }));

      // Adicionar imagens no FormData
      data.images?.forEach((file) => {
        formData.append('images', file);
      });

      await axios.post('/announcement/new-adoption-announcement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error('Erro ao criar anúncio de adoção', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, isSuccess, createAdoptionAnnouncement };
};
