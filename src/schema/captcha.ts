import { z } from "zod";

export const verifyCaptchaSchema = z.object({
    token: z.string()
});