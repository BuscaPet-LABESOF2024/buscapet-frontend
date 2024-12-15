import { z } from 'zod';

export const adoptionSchema = z.object({
  title: z
  .string()
  .min(1, 'O título é obrigatório')
  .max(50, 'O título não pode ter mais de 50 caracteres'),

  description: z.string().min(1, 'A descrição é obrigatória'),

  // Informações do animal
  animal: z.object({
    name: z
    .string()
    .min(1, 'O nome do animal é obrigatório')
    .max(50, 'O nome do animal não pode ter mais de 50 caracteres'),
    
    type: z
    .string()
    .min(1, 'O tipo do animal é obrigatório')
    .max(100, 'O tipo do animal não pode ter mais que 100 caracteres'),
    
    breed: z
    .string()
    .min(1, 'A raça é obrigatória')
    .max(100, 'A raça do animal não pode ter mais que 100 caracteres'),
    
    size: z.string().optional(), // Torne opcional se necessário
    weight: z.number().optional(), // Torne opcional se necessário
    age: z.number().optional(), // Torne opcional se necessário
  }),

  // Contato
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),

  // Imagens
  imageAnnouncement: z.object({
    image: z.string()
  }).optional(), // Aceita um array de strings (Base64) para imagens  
});
