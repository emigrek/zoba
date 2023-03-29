import { createVisitSchema } from "@/schema/visit";
import { createTRPCRouter, publicProcedure } from "../trpc";

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

            if(link) {
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
        })
});