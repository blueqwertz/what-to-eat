import { api } from "~/utils/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/datatable";
import { Button } from "../ui/button";
import { History, Meal } from "@prisma/client";

function MealSearch() {
  const { data: mealToEat, isLoading } = api.meals.findMeal.useQuery({
    data: { timeOfDay: "NOON" },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!mealToEat) {
    return <>Kein Gericht gefunden.</>;
  }

  return <DataTable data={mealToEat} columns={columns} showPages={false} />;
}

export default MealSearch;

export const columns: ColumnDef<
  ({ meal: Meal & { _count: { ingredientsInMeals: number } } } | undefined) &
    History
>[] = [
  {
    accessorKey: "meal.name",
    header: "Gericht",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button variant={"outline"} className="h-8 py-0">
            {row.original.meal._count.ingredientsInMeals} Zutaten
          </Button>
        </div>
      );
    },
  },
];
