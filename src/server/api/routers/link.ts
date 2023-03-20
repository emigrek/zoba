import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ 
            url: z.string().url()
        }))
        .mutation(async ({ input, ctx }) => {
            const { url } = input;
            const { prisma, session } = ctx;

            if(session) {
                const link = await prisma.link.create({
                    data: {
                        url,
                        user: {
                            connect: {
                                id: session.user.id
                            }
                        }
                    }
                });

                return link;
            } else {
                const link = await prisma.link.create({
                    data: {
                        url,
                    }
                });

                return link;
            }
        }),
    get: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const { id } = input;
            const { prisma } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    id
                }
            });

            return link;
        }),
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const links = await prisma.link.findMany({
                where: {
                    userId: session.user.id
                }
            });

            return links;
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const { prisma } = ctx;

            const link = await prisma.link.delete({
                where: {
                    id
                }
            });

            return link;
        })
});