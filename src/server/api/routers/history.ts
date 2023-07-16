import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.history.findMany({
      include: {
        meal: true,
      },
    });
  }),
  updateEntry: publicProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string().cuid(),
          date: z.date().optional(),
          mealId: z.string().cuid().optional(),
          timeOfDay: z
            .enum(["MORNING", "NOON", "AFTERNOON", "EVENING", "NIGHT"])
            .optional(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.history.update({
        where: {
          id: input.data.id,
        },
        data: {
          date: input.data.date,
          mealId: input.data.mealId,
          timeOfDay: input.data.timeOfDay,
        },
      });
    }),
});
