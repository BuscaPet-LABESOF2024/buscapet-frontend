import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createAdoptionAnnouncement = async (formData: FormData) => {
  // Fazer a requisição
  await axios.post('/announcement/new-adoption-announcement', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useCreateAdoptionAnnouncement = () => {
  return useMutation({
    mutationFn: createAdoptionAnnouncement,
  });
};
