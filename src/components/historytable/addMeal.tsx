import "@/utils/delocale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeOfDayNameMap } from "~/utils/enumMaps";
import MealCombo from "./mealcombo";
import { DatePicker } from "../ui/datepicker";
import { Button } from "../ui/button";
import { Clock8, Plus } from "lucide-react";

function AddMeal() {
  return (
    <>
      <div className="pt-2 text-sm text-muted-foreground">Hinzufügen</div>
      <div className="flex w-full flex-wrap items-center gap-2 rounded-md border px-2 py-2 text-sm">
        <MealCombo />
        <DatePicker className="w-auto grow" />
        <Select>
          <SelectTrigger className="w-[160px]">
            <Clock8 className="h-4 w-4" />
            <SelectValue placeholder="Uhrzeit" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(timeOfDayNameMap).map((entry) => {
              return (
                <SelectItem key={entry} value={entry}>
                  {timeOfDayNameMap[entry]}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button className="grow" variant={"outline"}>
          <Plus className="mr-1 h-4 w-4" />
          Hinzufügen
        </Button>
      </div>
    </>
  );
}

export default AddMeal;
