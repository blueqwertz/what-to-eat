import * as React from "react";
import { Button } from "../../ui/button";
import { Check, Loader2, Plus } from "lucide-react";
import useMeal from "~/hooks/useMeal";
import { api } from "~/utils/api";
import { timeOfDayNameMap } from "~/utils/enumMaps";
import { TimeOfDay } from "@prisma/client";

function MealButton() {
  const { meal, setMeal } = useMeal();

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate: addEntry } = api.history.addEntry.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: () => {
      ctx.history.getAll.invalidate();
      setLoading(false);
      setChecked(true);
      setTimeout(() => {
        setChecked(false);
      }, 800);
    },
  });

  return (
    <Button
      className="flex-1 gap-1"
      variant={"outline"}
      disabled={Object.values(meal).some((value) => value === undefined)}
      onClick={() => {
        addEntry({
          data: {
            mealId: meal.mealId ?? "",
            date: meal.date ?? new Date(),
            timeOfDay: meal.timeOfDay ?? TimeOfDay.NOON,
          },
        });
      }}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
      ) : checked ? (
        <Check className="h-4 w-4 text-lime-500" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Hinzufügen
    </Button>
  );
}

export default MealButton;
