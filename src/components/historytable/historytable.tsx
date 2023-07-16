import { api } from "~/utils/api";
import { DataTable } from "../ui/datatable";
import "@/utils/delocale";

function HistoryTable() {
  const { data: history, isLoading } = api.history.getAll.useQuery();

  if (isLoading) {
    return <div className="flex items-center gap-1">Loading...</div>;
  }

  return (
    <div className="space-y-3">
      <DataTable data={history!} columns={columns} />
      <AddMeal />
    </div>
  );
}

export default HistoryTable;

import { History, Meal } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { DateChanger } from "./datechanger";
import { timeOfDayNameMap } from "~/utils/enumMaps";
import AddMeal from "./addMeal";

export const columns: ColumnDef<({ meal: Meal } | undefined) & History>[] = [
  {
    accessorKey: "meal.name",
    header: "Essen",
    cell: ({ row }) => {
      const entry = row.original;

      return (
        <>
          <div className="flex flex-wrap gap-1">
            {entry.meal.name}{" "}
            <Badge
              variant={"outline"}
              className="px-2 text-[10px] leading-tight"
            >
              {timeOfDayNameMap[entry.timeOfDay] ?? entry.timeOfDay}
            </Badge>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Datum",
    cell: ({ row }) => {
      return (
        <DateChanger defaultDate={row.original.date} id={row.original.id} />
      );
    },
  },
];
