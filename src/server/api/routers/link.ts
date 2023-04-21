import { createCaptchaLinkSchema, deleteLinkSchema, getInfiniteSchema, getLinkSchema } from "@/schema/link";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";

const verifyCaptcha = async (token: string) => {
    const response = await fetch(
        `https://hcaptcha.com/siteverify`,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: `response=${token}&secret=${env.HCAPTCHA_SECRET_KEY}`,
            method: "POST",
        }
    );
    const data = await response.json();
    return data.success;
};

export const linkRouter = createTRPCRouter({
    create: publicProcedure
        .input(createCaptchaLinkSchema)
        .mutation(async ({ input, ctx }) => {
            const { url, captcha } = input;
            const { prisma, session } = ctx;
            const validCaptcha = await verifyCaptcha(captcha);

            if(!validCaptcha) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid captcha"
                });
            }

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
                include: {
                    visits: true
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