import { api } from "~/utils/api";
import "@/utils/delocale";

function MealTable() {
  const { data: meals, isLoading } = api.meals.getAll.useQuery();

  if (isLoading) {
    return <div className="flex items-center gap-1">Loading...</div>;
  }

  return (
    <>
      <DataTable
        data={meals!}
        columns={columns}
        searchField="name"
        filterName="Gerichte"
      />
    </>
  );
}

export default MealTable;

import { Meal } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/datatable";
import IngredientPopover from "./ingredientspopover";

export const columns: ColumnDef<
  ({ _count: { ingredientsInMeals: number } } | undefined) & Meal
>[] = [
  {
    accessorKey: "name",
    header: "Essen",
  },
  {
    accessorKey: "_count.ingredientsInMeal",
    header: "Zutaten",
    cell: ({ row }) => {
      return (
        <IngredientPopover
          id={row.original.id}
          name={row.original.name}
          count={row.original._count.ingredientsInMeals}
        />
      );
    },
  },
];
