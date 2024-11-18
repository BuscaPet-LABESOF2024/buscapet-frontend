import { z } from 'zod';

export const missingAnimalSchema = z.object({
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

  // Informações do endereço
  endereco: z.object({
    rua: z.string().min(1, 'O nome da rua é obrigatório'),
    number: z.string().min(1, 'O número do endereço é obrigatório'),
    neighborhood: z.string().min(1, 'O bairro é obrigatório'),
    cep: z.string().min(1, 'O CEP é obrigatório'),
  }),

  // Contato
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),

  // Imagens
  imageAnnouncement: z.object({
    image: z.string()
  }).optional(), // Aceita um array de strings (Base64) para imagens  
});


export type MissingAnimalFormSchema = z.infer<typeof missingAnimalSchema>;
