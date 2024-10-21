import { z } from 'zod';

export const adoptionSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),

  // Informações do animal
  animal: z.object({
    name: z.string().min(1, 'O nome do animal é obrigatório'),
    statusAnimal: z.number().int().min(1, 'O status do animal é obrigatório'), // Definido como 3 no form
    type: z.string().min(1, 'O tipo do animal é obrigatório'),
    breed: z.string().min(1, 'A raça é obrigatória'),
    size: z.string(),
    weight: z.string(),
    age: z.string(),
  }),

  // Tipo de anúncio
  announcementType: z.object({
    id: z.number().int().min(1, 'O tipo de anúncio é obrigatório'),
  }),

  // Contato
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),

  // Informações do usuário
  user: z.object({
    id: z.number().int().min(1, 'O ID do usuário é obrigatório'),
  }),

  // Imagens
  images: z.array(z.instanceof(File)).optional(), // Imagens são opcionais, mas devem ser um array de arquivos
});
