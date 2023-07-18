import * as React from "react";
import { api } from "~/utils/api";
import { Combobox } from "../../ui/combobox";
import { Loader2 } from "lucide-react";
import useMeal from "~/hooks/useMeal";

type MealComboType = {};

function MealCombo({}: MealComboType) {
  const { data: ingredients, isLoading } = api.meals.getAll.useQuery();

  const { meal, setMeal } = useMeal();

  if (isLoading || !ingredients) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <Combobox
      className={"flex-1"}
      value={meal.mealId}
      setValue={(value) => {
        setMeal((prev) => {
          return {
            ...prev,
            mealId: value,
          };
        });
      }}
      options={ingredients?.map((entry) => {
        return {
          value: entry.id,
          label: entry.name,
        };
      })}
      placeholder="Gericht"
    />
  );
}

export default MealCombo;
