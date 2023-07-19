import * as React from "react";
import { api } from "~/utils/api";
import { Combobox } from "../ui/combobox";
import { Loader2 } from "lucide-react";

type MealComboType = {
  filter?: {
    ingredient: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  value: string | undefined;
  setValue: (value: string | undefined) => void;
};

function IngredientCombo({ filter, value, setValue }: MealComboType) {
  const { data: ingredients, isLoading } = api.ingredients.getAll.useQuery();

  if (isLoading || !ingredients) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <Combobox
      value={value}
      setValue={(value) => {
        setValue(value);
      }}
      options={ingredients
        ?.map((entry) => {
          return {
            value: entry.id,
            label: entry.name,
          };
        })
        .filter((entry) => {
          return !filter?.find(
            (element) => element.ingredient.id == entry.value
          );
        })}
      placeholder="Zutat"
      className="grow"
    />
  );
}

export default IngredientCombo;
