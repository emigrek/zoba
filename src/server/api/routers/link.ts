import { createLinkSchema, deleteLinkSchema, getInfiniteSchema, getLinkSchema } from "@/schema/link";
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
                },
                include: {
                    visits: true
                }
            });

            return links;
        }),
    getInfinite: protectedProcedure
        .input(getInfiniteSchema)
        .query(async ({ input, ctx }) => {
            const limit = input.limit ?? 10;
            const { cursor } = input;
            const { prisma, session } = ctx;

            const links = await prisma.link.findMany({
                take: limit + 1,
                where: {
                    userId: session.user.id
                },
                cursor: cursor ? { id: cursor } : undefined,
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (links.length > limit) {
                const nextItem = links.pop()
                nextCursor = nextItem!.id;
            }
            return {
                links,
                nextCursor,
            };
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