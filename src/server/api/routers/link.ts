import { createLinkSchema, deleteLinkSchema, getLinkSchema, getPageSchema } from "@/schema/link";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
    create: publicProcedure
        .input(createLinkSchema)
        .mutation(async ({ input, ctx }) => {
            const { url } = input;
            const { prisma, session } = ctx;

            if (session) {
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
        .input(getLinkSchema)
        .query(async ({ input, ctx }) => {
            const { slug } = input;
            const { prisma } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    slug
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
    getPage: protectedProcedure
        .input(getPageSchema)
        .query(async ({ input, ctx }) => {
            const { page } = input;
            const { prisma, session } = ctx;

            const links = await prisma.link.findMany({
                where: {
                    userId: session.user.id
                },
                skip: (page - 1) * 5,
                take: 5
            });

            return links;
        }),
    getTotalPages: protectedProcedure
        .query(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const totalPages = Math.ceil(await prisma.link.count({
                where: {
                    userId: session.user.id
                }
            }) / 5);

            return totalPages;
        }),
    delete: protectedProcedure
        .input(deleteLinkSchema)
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