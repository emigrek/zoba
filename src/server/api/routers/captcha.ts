import { verifyCaptchaSchema } from "@/schema/captcha";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";

export const captchaRouter = createTRPCRouter({
    verify: publicProcedure
        .input(verifyCaptchaSchema)
        .mutation(async ({ input, ctx }) => {
            const { token } = input;

            const response = await fetch(
                `https://hcaptcha.com/siteverify`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                    },
                    body: `response=${token}&secret=${env.HCAPTCHA_SECRET_KEY}`,
                    method: "POST",
                }
            );
            const data = await response.json();

            if(data.success) {
                return true;
            } else {
                return new Error("Captcha verification failed");
            }
        }
    )
});