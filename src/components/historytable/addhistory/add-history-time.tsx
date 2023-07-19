import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeOfDayNameMap } from "~/utils/enumMaps";
import { Clock8 } from "lucide-react";
import useMeal from "~/hooks/useMeal";
import { TimeOfDay } from "@prisma/client";

function MealTime() {
  const { meal, setMeal } = useMeal();
  return (
    <>
      <Select
        value={meal.timeOfDay}
        onValueChange={(value: TimeOfDay) => {
          setMeal((prev) => {
            return {
              ...prev,
              timeOfDay: value,
            };
          });
        }}
      >
        <SelectTrigger className="w-auto flex-1 space-x-1">
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
    </>
  );
}

export default MealTime;
