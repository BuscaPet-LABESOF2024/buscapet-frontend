import type { z } from 'zod';
import { adoptionSchema } from './schema';

export type AdoptionFormSchema = z.infer<typeof adoptionSchema>;