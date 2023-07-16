import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mealRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.meal.findMany({
      include: {
        _count: {
          select: {
            ingredientsInMeals: true,
          },
        },
      },
    });
  }),
  getOne: publicProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string().cuid(),
        }),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.meal.findMany({
        where: {
          id: input.data.id,
        },
      });
    }),
  getIngredients: publicProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string().cuid(),
        }),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.ingredientsInMeals.findMany({
        where: {
          mealId: input.data.id,
        },
        select: {
          count: true,
          unit: true,
          ingredient: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
    }),
  updateEntry: publicProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string().cuid(),
          name: z.string().optional(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.meal.update({
        where: {
          id: input.data.id,
        },
        data: {
          name: input.data.name,
        },
      });
    }),
});
