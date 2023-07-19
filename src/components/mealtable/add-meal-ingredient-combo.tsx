import * as React from "react";
import { api } from "~/utils/api";
import { Loader2 } from "lucide-react";
import { ComboboxMulti } from "../ui/combobox-multi";

type MealComboType = {
  value: { value: string | undefined; label: string | undefined }[];
  setValue: (value: string | undefined, label: string | undefined) => void;
};

export function MealIngredientCombo({
  value: selectedIngredients,
  setValue,
}: MealComboType) {
  const { data: ingredients, isLoading } = api.ingredients.getAll.useQuery();

  if (isLoading || !ingredients) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <ComboboxMulti
      value={selectedIngredients}
      setValue={(value: string | undefined, label: string | undefined) => {
        setValue(value, label);
      }}
      options={ingredients?.map((entry) => {
        return {
          value: entry.id,
          label: entry.name,
        };
      })}
      placeholder="Zutat"
      className="grow"
    />
  );
}
