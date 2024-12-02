import { z } from 'zod';

export const filterFormSchema = z.object({
  announcementType: z.string(),
  animalSize: z.string(),
});

export const announcementTypes = [
  { id: 1, descricao: 'Perdido' },
  { id: 2, descricao: 'Encontrado' },
  { id: 3, descricao: 'Disponível para adoção' },
];

export const animalSizes = [
  { id: 1, descricao: 'Pequeno' },
  { id: 2, descricao: 'Médio' },
  { id: 3, descricao: 'Grande' },
];
