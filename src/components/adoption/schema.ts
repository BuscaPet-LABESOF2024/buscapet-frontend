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
    size: z.string().min(1, 'O tamanho é obrigatório'),
    weight: z.string().min(1, 'O peso é obrigatório'),
    age: z.string().min(1, 'A idade é obrigatória'),
  }),

  // Contato
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),

  // Imagens
  images: z.array(z.instanceof(File)).optional(), // Imagens são opcionais, mas devem ser um array de arquivos
});
