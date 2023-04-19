import { createTRPCRouter } from "@/server/api/trpc";
import { visitRouter } from "./routers/visit";
import { linkRouter } from "./routers/link";
import { captchaRouter } from "./routers/captcha";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  link: linkRouter,
  visit: visitRouter,
  captcha: captchaRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
