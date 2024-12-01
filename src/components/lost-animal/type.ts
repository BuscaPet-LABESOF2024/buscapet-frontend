import { z } from 'zod';
import { LostSchema } from './schema';

export type LostAnimalFormSchema = z.infer<typeof LostSchema>;
