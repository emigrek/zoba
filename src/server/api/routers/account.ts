import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
    delete: protectedProcedure
        .mutation(async ({ ctx }) => {
            const { prisma, session } = ctx;

            const account = await prisma.user.findUnique({
                where: {
                    id: session.user.id
                }
            });

            if(!account) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Account not found"
                });
            }

            if(account.id !== session.user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You do not have permission to delete this account"
                });
            }

            await prisma.user.delete({
                where: {
                    id: session.user.id
                }
            });

            return true;
        }
    )
});