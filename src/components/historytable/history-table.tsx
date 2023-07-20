import { api } from "~/utils/api";
import { DataTable } from "../ui/datatable";
import "@/utils/delocale";
import { History, Meal } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { DateChanger } from "./history-date-changer";
import { timeOfDayNameMap } from "~/utils/enumMaps";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import React from "react";
import RemoveHistory from "./remove-history-button";

function HistoryTable() {
  const { data: history, isLoading } = api.history.getAll.useQuery();

  if (isLoading) {
    return <div className="flex items-center gap-1">Loading...</div>;
  }

  return (
    <div className="space-y-3">
      <DataTable data={history!} columns={columns} />
    </div>
  );
}

export default HistoryTable;

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
        <DateChanger
          key={row.original.id}
          defaultDate={row.original.date}
          id={row.original.id}
        />
        // dayjs(row.original.date).format("DD.MM.YYYY")
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <RemoveHistory id={row.original.id} />;
    },
  },
];
