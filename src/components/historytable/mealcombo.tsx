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
};

function MealCombo({ filter }: MealComboType) {
  const { data: ingredients, isLoading } = api.meals.getAll.useQuery();

  if (isLoading || !ingredients) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <Combobox
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
