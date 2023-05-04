import { z } from "zod";

const url = z.string().nonempty({
    message: "Please enter a URL"
}).url({
    message: "Please enter a valid URL"
});
const slug = z.string().min(3, {
    message: "Slug must be at least 3 characters long"
}).max(16, {
    message: "Slug must be at most 16 characters long"
}).regex(/^[a-zA-Z0-9-_]+$/, {
    message: "Slug must only contain alphanumeric characters, dashes, and underscores"
});

export const createLinkSchema = z.object({
    url
});

export const editLinkSchema = z.object({
    id: z.string(),
    url,
    slug
});

export const createCaptchaLinkSchema = z.object({
    url: url,
    captcha: z.string().nonempty(),
});

export const getInfiniteSchema = z.object({
    query: z.string(),
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish()
});

export const getLinkBySlugSchema = z.object({ slug: z.string() });

export const getLinkByIdSchema = z.object({ id: z.string() });

export const checkSlugSchema = z.object({
    slug
});

export const deleteLinkSchema = z.object({ id: z.string() });

export type EditLinkSchema = z.infer<typeof editLinkSchema>;
export type CreateLinkSchema = z.infer<typeof createLinkSchema>;