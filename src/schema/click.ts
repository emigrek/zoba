import { z } from "zod";

export const createClickSchema = z.object({ 
    id: z.string()
});
