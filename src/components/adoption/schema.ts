import { z } from 'zod';

export const adoptionSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),

  // Informações do animal
  animal: z.object({
    name: z.string().min(1, 'O nome do animal é obrigatório'),// Definido como 3 no form
    type: z.string().min(1, 'O tipo do animal é obrigatório'),
    breed: z.string().min(1, 'A raça é obrigatória'),
    size: z.string(),
    weight: z.string(),
    age: z.string(),
  }),

  // Contato
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),

  // Imagens
  images: z.array(z.instanceof(File)).optional(), // Imagens são opcionais, mas devem ser um array de arquivos
});
