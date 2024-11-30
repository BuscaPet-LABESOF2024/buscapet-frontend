import { z } from "zod";

export const filterFormSchema = z.object({
  announcementType: z.number().optional(),
  neighborhood: z.string().optional(),
  animalBreed: z.string().optional(),
});