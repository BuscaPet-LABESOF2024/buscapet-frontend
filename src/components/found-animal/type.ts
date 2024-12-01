import { z } from 'zod';
import { FoundSchema } from './schema';

export type FoundAnimalFormSchema = z.infer<typeof FoundSchema>;
