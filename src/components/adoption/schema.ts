import { z } from 'zod';

export const adoptionSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  animal: z.string().optional(),
  announcement_type: z.string().optional(),
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),
  contact_email: z.string().email('E-mail inválido'),
  images: z.array(z.instanceof(File)),
  
  // Campos opcionais
  status_animal: z.enum(['adoção', 'encontrado', 'desaparecido']).optional(),
  type: z.string().optional(),
  breed: z.string().optional(),
  size_animal: z.string().optional(),
  weight: z.string().optional(),
  age: z.string().optional(),
});
