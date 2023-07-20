import { api } from "~/utils/api";
import "@/utils/delocale";

function IngredientTable() {
  const { data: ingredients, isLoading } = api.ingredients.getAll.useQuery();

  if (isLoading) {
    return <div className="flex items-center gap-1">Loading...</div>;
  }

  return (
    <>
      <DataTable
        data={ingredients!}
        columns={columns}
        searchField="name"
        filterName="Zutaten"
      />
    </>
  );
}

export default IngredientTable;

import { Ingredient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/datatable";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import RemoveIngredient from "./remove-ingredient-button";

export const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "name",
    header: "Zutat",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <RemoveIngredient id={row.original.id} />;
    },
  },
];
