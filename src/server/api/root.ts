import { createTRPCRouter } from "@/server/api/trpc";
import { clickRouter } from "./routers/click";
import { linkRouter } from "./routers/link";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  link: linkRouter,
  click: clickRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
