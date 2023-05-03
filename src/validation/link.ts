import { z } from "zod";

export const createLinkSchema = z.object({
    url: z.string().nonempty({
        message: "Please enter a URL"
    }).url({
        message: "Please enter a valid URL"
    })
});

export const createCaptchaLinkSchema = z.object({
    url: z.string().nonempty({
        message: "Please enter a URL"
    }).url({
        message: "Please enter a valid URL"
    }),
    captcha: z.string().nonempty()
});

export const getInfiniteSchema = z.object({
    query: z.string(),
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish()
});

export const getLinkSchema = z.object({ slug: z.string() });

export const deleteLinkSchema = z.object({ id: z.string() });

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;