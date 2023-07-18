import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DateToUTC } from "~/utils/dateConvert";

export const historyRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.history.findMany({
      include: {
        meal: true,
      },
      orderBy: {
        date: "desc",
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
      if (input.data.date) {
        input.data.date = DateToUTC(input.data.date);
      }
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
  addEntry: publicProcedure
    .input(
      z.object({
        data: z.object({
          mealId: z.string().cuid(),
          date: z.date(),
          timeOfDay: z.enum([
            "MORNING",
            "NOON",
            "AFTERNOON",
            "EVENING",
            "NIGHT",
          ]),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      input.data.date = DateToUTC(input.data.date);
      return ctx.prisma.history.create({
        data: {
          date: input.data.date,
          mealId: input.data.mealId,
          timeOfDay: input.data.timeOfDay,
        },
      });
    }),
  deleteEntry: publicProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string().cuid(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.history.delete({
        where: {
          id: input.data.id,
        },
      });
    }),
});
