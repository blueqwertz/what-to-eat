import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ingredient.findMany();
  }),
  addEntry: publicProcedure
    .input(z.object({ data: z.object({ name: z.string() }) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ingredient.create({
        data: {
          name: input.data.name,
        },
      });
    }),
  deleteEntry: publicProcedure
    .input(z.object({ data: z.object({ id: z.string().cuid() }) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ingredient.delete({
        where: {
          id: input.data.id,
        },
      });
    }),
});
