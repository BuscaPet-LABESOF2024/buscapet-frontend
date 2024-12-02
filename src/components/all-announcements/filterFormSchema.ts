import { z } from 'zod';

export const filterFormSchema = z.object({
  announcementType: z.string({
    required_error: 'Tipo de anúncio é obrigatório',
  }),
  neighborhood: z.string({ required_error: 'Bairro é obrigatório' }),
  animalBreed: z.string({ required_error: 'Raça é obrigatória' }),
});
