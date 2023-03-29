import { z } from "zod";

export const createVisitSchema = z.object({ 
    id: z.string()
});
