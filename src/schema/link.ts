import { z } from "zod";

export const createLinkSchema = z.object({ 
    url: z.string().url({
        message: "Please enter a valid URL"
    })
});

export const getPageSchema = z.object({
    page: z.number().min(1).default(1)
});

export const getLinkSchema = z.object({ slug: z.string() });

export const deleteLinkSchema = z.object({ id: z.string() });