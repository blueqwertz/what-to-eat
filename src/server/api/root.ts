import { historyRouter } from "~/server/api/routers/history";
import { createTRPCRouter } from "~/server/api/trpc";
import { mealRouter } from "./routers/meal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  history: historyRouter,
  meals: mealRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
