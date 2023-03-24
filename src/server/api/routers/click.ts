import { createClickSchema } from "@/schema/click";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const clickRouter = createTRPCRouter({
    create: publicProcedure
        .input(createClickSchema)
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const { prisma } = ctx;

            const link = await prisma.link.findUnique({
                where: {
                    id
                }
            });

            if(link) {
                const click = await prisma.click.create({
                    data: {
                        link: {
                            connect: {
                                id
                            }
                        }
                    }
                });

                return click;
            } else {
                throw new Error("Link not found");
            }
        })
});