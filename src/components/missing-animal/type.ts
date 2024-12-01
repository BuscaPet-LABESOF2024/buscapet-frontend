import { z } from 'zod';
import { LostAnimalSchema } from './schema';

export type MissingAnimalFormSchema = z.infer<typeof LostAnimalSchema>;
