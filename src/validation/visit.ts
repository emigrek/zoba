import { z } from "zod";

export const createVisitSchema = z.object({ 
    id: z.string()
});

export const deleteVisitsSchema = z.object({
    id: z.string()
});