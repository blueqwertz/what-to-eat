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
    id: "action",
    cell: ({ row }) => {
      const [isLoading, setLoading] = useState<boolean>(false);

      const ctx = api.useContext();

      const { mutate: deleteEntry } = api.meals.deleteEntry.useMutation({
        onMutate: () => {
          setLoading(true);
        },
        onError: () => {
          setLoading(false);
        },
        onSuccess: () => {
          ctx.meals.getAll.invalidate();
          ctx.history.getAll.invalidate();
        },
      });
      return (
        <div className="flex justify-end">
          <Button
            key={`del-${row.original.id}`}
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              deleteEntry({ data: { id: row.original.id } });
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
            ) : (
              <Trash2 className="h-4 w-4 text-red-600" />
            )}
          </Button>
        </div>
      );
    },
  },
];
