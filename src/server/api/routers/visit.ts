import { createVisitSchema, deleteVisitsSchema } from "@/validation/visit";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
    deleteVisits: protectedProcedure
        .input(deleteVisitsSchema)
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const { prisma, session } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    id
                }
            });

            if(!link) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Link not found"
                });
            }

            if(link.userId !== session.user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You do not have permission to delete visits for this link"
                });
            }

            await prisma.visit.deleteMany({
                where: {
                    link: {
                        id: link.id
                    }
                }
            });

            return true;
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