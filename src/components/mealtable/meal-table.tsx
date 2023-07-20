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
import IngredientPopover from "./ingredients-popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import RemoveMeal from "./remove-meal-button";

export const columns: ColumnDef<Meal>[] = [
  {
    accessorKey: "name",
    header: "Essen",
  },
  {
    accessorKey: "_count.ingredientsInMeal",
    header: "Zutaten",
    cell: ({ row }) => {
      return (
        <IngredientPopover id={row.original.id} name={row.original.name} />
      );
    },
  },
  {
    header: "Zuletzt",
    cell: ({ row }) => {
      const { data, isLoading } = api.meals.getLastHistoryEntry.useQuery({
        data: { id: row.original.id },
      });

      if (isLoading || !data) {
        return <>Loading...</>;
      }
      if (data.length == 0) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      const dayDiff = dayjs().diff(data[0]?.date, "days");

      return (
        <>
          {dayjs(data[0]?.date).format("dd, DD. MMMM")} (vor {dayDiff}{" "}
          {dayDiff == 1 ? "Tag" : "Tagen"})
        </>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <RemoveMeal id={row.original.id} />;
    },
  },
];
