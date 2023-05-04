import { z } from "zod";

export const searchSchema = z.object({
    query: z.string().nonempty({
        message: "Please enter a search query"
    })
});

export type SearchSchema = z.infer<typeof searchSchema>;