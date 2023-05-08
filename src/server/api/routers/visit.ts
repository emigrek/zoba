import { createVisitSchema } from "@/validation/visit";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const visitRouter = createTRPCRouter({
    create: publicProcedure
        .input(createVisitSchema)
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const { prisma } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    id
                }
            });

            if (link) {
                const visit = await prisma.visit.create({
                    data: {
                        link: {
                            connect: {
                                id
                            }
                        }
                    }
                });

                return visit;
            } else {
                throw new Error("Link not found");
            }
        }),
    getCount: protectedProcedure
        .query(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const count = await prisma.visit.count({
                where: {
                    link: {
                        userId: session.user.id
                    }
                }
            });

            return count;
        })
});