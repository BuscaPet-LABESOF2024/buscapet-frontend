import { z } from 'zod';

export const FoundSchema = z.object({
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
    weight: z.string().optional(), // Torne opcional se necessário
    age: z.string().optional(), // Torne opcional se necessário
  }),

  // Contato
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),

  // Imagens
  imageAnnouncement: z.object({
    image: z.string()
  }).optional(), // Aceita um array de strings (Base64) para imagens 
  
  address: z.object({
    street: z
    .string()
    .min(1, 'Preenchimento da rua é obrigatório')
    .max(150, 'Rua não pode ter mais de 150 caracteres'),

    number: z.string().min(1, 'Preenchimento do número é obrigatório'), // Torne opcional se necessário

    neighborhod: z
    .string()
    .min(1, 'Preenchimento do bairro é obrigatório')
    .max(150, 'Bairro não pode ter mais de 150 caracteres'), // Torne opcional se necessário

    cep: z
    .string()
    .min(1, 'Preenchimento do CEP é obrigatório'),
  }),

  data: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'A data de desaparecimento é obrigatória',
  }).transform(val => new Date(val)),

});
