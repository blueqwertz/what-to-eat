import { api } from "~/utils/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/datatable";
import { Button } from "../ui/button";
import { History, Meal, TimeOfDay } from "@prisma/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { timeOfDayNameMap, unitMap } from "~/utils/enumMaps";
import { Clock8 } from "lucide-react";

function MealSearch() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TimeOfDay.NOON);

  const { data: mealToEat, isLoading } = api.meals.findMeal.useQuery({
    data: { timeOfDay },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!mealToEat) {
    return <>Kein Gericht gefunden.</>;
  }

  return (
    <>
      <Select
        value={timeOfDay}
        onValueChange={(value: TimeOfDay) => {
          setTimeOfDay(value);
        }}
      >
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <Clock8 className="h-4 w-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {Object.keys(timeOfDayNameMap).map((entry) => {
            return (
              <SelectItem value={entry} key={entry}>
                {timeOfDayNameMap[entry]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <DataTable data={mealToEat} columns={columns} showPages={false} />
    </>
  );
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
