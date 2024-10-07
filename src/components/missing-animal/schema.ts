import { z } from 'zod';

export const missingAnimalSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  animal: z.string().optional(),
  announcement_type: z.literal('desaparecido').optional(),
  contact_phone: z.string().min(10, 'O telefone de contato é obrigatório'),
  contact_email: z.string().email('E-mail inválido'),
  images: z.array(z.instanceof(File)),
  missing_date: z.string().min(1, 'A data de desaparecimento é obrigatória'),

  // Campos opcionais
  status_animal: z.enum(['adoção', 'encontrado', 'desaparecido']).optional(),
  type: z.string().optional(),
  breed: z.string().optional(),
  size_animal: z.string().optional(),
  weight: z.string().optional(),
  age: z.string().optional(),
});

// Se você estiver utilizando um tipo específico para o formulário,
// defina também o tipo aqui.

export type MissingAnimalFormSchema = z.infer<typeof missingAnimalSchema>;
