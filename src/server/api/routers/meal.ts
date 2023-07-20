import { Unit } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const mealRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.meal.findMany();
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
      return ctx.prisma.$transaction([
        ctx.prisma.ingredientsInMeals.findMany({
          where: {
            mealId: input.data.id,
          },
          include: {
            ingredient: true,
          },
        }),
        ctx.prisma.ingredientsInMeals.count({
          where: {
            mealId: input.data.id,
          },
        }),
      ]);
    }),
  getLastHistoryEntry: publicProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string().cuid(),
        }),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.history.findMany({
        where: {
          mealId: input.data.id,
        },
        orderBy: {
          date: "desc",
        },
        take: 1,
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
  addIngredient: publicProcedure
    .input(
      z.object({
        data: z.object({
          mealId: z.string().cuid(),
          ingredientId: z.string().cuid(),
          count: z.number(),
          unit: z.enum(["GRAMM", "MILLILITER", "SPOONS", "PIECES"]),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ingredientsInMeals.create({
        data: {
          mealId: input.data.mealId,
          ingredientId: input.data.ingredientId,
          count: input.data.count,
          unit: input.data.unit,
        },
      });
    }),
  deleteIngredient: publicProcedure
    .input(
      z.object({
        data: z.object({
          mealId: z.string().cuid(),
          ingredientId: z.string().cuid(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ingredientsInMeals.deleteMany({
        where: {
          AND: {
            mealId: input.data.mealId,
            ingredientId: input.data.ingredientId,
          },
        },
      });
    }),
  addEntry: publicProcedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          ingredientId: z.string().array(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.meal.create({
        data: {
          name: input.data.name,
          ingredientsInMeals: {
            create: input.data.ingredientId.map((entry) => {
              return {
                count: 0,
                unit: Unit.GRAMM,
                ingredient: {
                  connect: {
                    id: entry,
                  },
                },
              };
            }),
          },
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
      return ctx.prisma.meal.delete({
        where: {
          id: input.data.id,
        },
      });
    }),

  // SEARCH
  findMeal: publicProcedure
    .input(
      z.object({
        data: z.object({
          timeOfDay: z.enum(["MORNING", "NOON", "AFTERNOON", "EVENING"]),
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const { timeOfDay } = input.data;

      const lastMealAtTime = await ctx.prisma.history.findMany({
        where: {
          timeOfDay,
        },
        orderBy: {
          date: "asc",
        },
        take: 2,
        include: {
          meal: {
            select: {
              id: true,
              createdAt: true,
              name: true,
              _count: {
                select: {
                  ingredientsInMeals: true,
                },
              },
            },
          },
        },
      });

      if (lastMealAtTime?.length > 0) {
        return lastMealAtTime;
      }

      const randomMeal = await ctx.prisma.history.findMany({
        take: 2,
        include: {
          meal: {
            select: {
              id: true,
              createdAt: true,
              name: true,
              _count: {
                select: {
                  ingredientsInMeals: true,
                },
              },
            },
          },
        },
      });

      return randomMeal;
    }),
});
