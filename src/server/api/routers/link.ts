import { checkSlugSchema, createCaptchaLinkSchema, deleteLinkSchema, editLinkSchema, getInfiniteSchema, getLinkByIdSchema, getLinkBySlugSchema } from "@/validation/link";
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
    edit: protectedProcedure
        .input(editLinkSchema)
        .mutation(async ({ input, ctx }) => {
            const { id, url, slug } = input;
            const { prisma, session } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    id
                }
            });

            const slugTaken = await prisma.link.findFirst({
                where: {
                    slug
                }
            }) !== null;
            
            if(!link) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Link not found"
                });
            }

            if(slugTaken && link.slug !== slug) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Slug already taken"
                });
            }

            if(link.userId !== session.user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have permission to edit this link"
                });
            }

            if(link.url === url && link.slug === slug) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Nothing to update"
                });
            }

            const updatedLink = await prisma.link.update({
                where: {
                    id
                },
                data: {
                    url,
                    slug
                }
            });

            return updatedLink;
        }),
    getById: publicProcedure
        .input(getLinkByIdSchema)
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
    getBySlug: publicProcedure
        .input(getLinkBySlugSchema)
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
            const { cursor, query } = input;
            const { prisma, session } = ctx;

            const links = await prisma.link.findMany({
                where: {
                    userId: session.user.id,
                    OR: [
                        {
                            url: {
                                contains: query
                            }
                        },
                        {
                            slug: {
                                contains: query
                            }
                        }
                    ]
                },
                include: {
                    visits: true
                },
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    createdAt: "desc"
                }
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
    getMostVisited: protectedProcedure
        .query(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const links = await prisma.link.findMany({
                where: {
                    userId: session.user.id
                },
                include: {
                    visits: true
                },
                orderBy: {
                    visits: {
                        _count: "desc"
                    }
                },
                take: 3
            });

            return links;
        }),
    checkSlug: publicProcedure
        .input(checkSlugSchema)
        .query(async ({ input, ctx }) => {
            const { slug } = input;
            const { prisma } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    slug
                }
            });

            return link ? false : true;
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
        }),
    getCount: protectedProcedure
        .query(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const count = await prisma.link.count({
                where: {
                    userId: session.user.id
                }
            });

            return count;
        }
    )
});