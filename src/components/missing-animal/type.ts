import { z } from 'zod';
import { missingAnimalSchema } from './schema';

export type MissingAnimalFormSchema = z.infer<typeof missingAnimalSchema>;
