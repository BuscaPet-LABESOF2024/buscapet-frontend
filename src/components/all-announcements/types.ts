import type { z } from "zod";
import type { filterFormSchema } from "./filterFormSchema";

export type FilterFormSchemaType = z.infer<typeof filterFormSchema>;