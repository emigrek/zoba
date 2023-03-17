import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { nanoid } from "nanoid";

export const linkRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ 
            url: z.string().url(),
            slug: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            const { url, slug: preferredSlug } = input;
            const { prisma, session } = ctx;
            let slug = preferredSlug || nanoid(6);

            if(session) {
                const link = await prisma.link.create({
                    data: {
                        url,
                        slug,
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
                        slug,
                    }
                });

                return link;
            }
        }),
    get: publicProcedure
        .input(z.object({ slug: z.string() }))
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
    delete: protectedProcedure
        .input(z.object({ slug: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { slug } = input;
            const { prisma } = ctx;

            const link = await prisma.link.delete({
                where: {
                    slug
                }
            });

            return link;
        })
});