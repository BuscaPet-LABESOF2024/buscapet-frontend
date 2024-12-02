import { z } from 'zod';

export const LostSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),

  // Informações do animal
  animal: z.object({
    name: z.string().min(1, 'O nome do animal é obrigatório'),
    type: z.string().min(1, 'O tipo do animal é obrigatório'),
    breed: z.string().min(1, 'A raça é obrigatória'),
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
    street: z.string().min(1, 'Preenchimento da rua é obrigatório'),
    number: z.string().min(1, 'Preenchimento do número é obrigatório'), // Torne opcional se necessário
    neighborhod: z.string().min(1, 'Preenchimento do bairro é obrigatório'), // Torne opcional se necessário
    cep: z.string().min(1, 'Preenchimento do CEP é obrigatório'),
  }),

  data: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'A data de desaparecimento é obrigatória',
  }).transform(val => new Date(val)),

});
