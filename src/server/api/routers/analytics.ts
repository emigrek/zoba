import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
    getCount: protectedProcedure
        .query(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const linksCount = await prisma.link.count({
                where: {
                    userId: session.user.id
                }
            });
            const visitsCount = await prisma.visit.count({
                where: {
                    link: {
                        userId: session.user.id
                    }
                }
            });

            return {
                linksCount,
                visitsCount
            };
        })
});