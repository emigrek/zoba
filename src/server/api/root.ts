import { createTRPCRouter } from "@/server/api/trpc";
import { visitRouter } from "@/server/api/routers/visit";
import { linkRouter } from "@/server/api/routers/link";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  link: linkRouter,
  visit: visitRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
