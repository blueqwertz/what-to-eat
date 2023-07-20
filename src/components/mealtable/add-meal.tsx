import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { MealIngredientCombo } from "./add-meal-ingredient-combo";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { Check, Loader2, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function AddMeal() {
  const [meal, setMeal] = useState<{
    name: string;
    ingredients: { value: string | undefined; label: string | undefined }[];
  }>({
    name: "",
    ingredients: [],
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate: addMeal } = api.meals.addEntry.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: () => {
      void ctx.meals.getAll.invalidate();
      setLoading(false);
      setChecked(true);
      setTimeout(() => {
        setChecked(false);
      }, 800);
      setMeal({
        name: "",
        ingredients: [],
      });
    },
  });

  const NameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMeal((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Hinzufügen
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-3 w-[300px]">
        <div className="flex flex-wrap gap-1">
          <Input
            placeholder="Gericht"
            className="grow"
            value={meal.name}
            onChange={NameChange}
          />
          <MealIngredientCombo
            value={meal.ingredients}
            setValue={(value, label) => {
              setMeal((prev) => {
                const check = prev.ingredients.find((entry) => {
                  return entry.value == value;
                });

                const newIngredients = !!check
                  ? [
                      ...prev.ingredients.filter((entry) => {
                        return entry.value != value;
                      }),
                    ]
                  : [...prev.ingredients, { value, label }];

                return {
                  ...prev,
                  ingredients: newIngredients,
                };
              });
            }}
          />
          <Button
            variant={"outline"}
            size={"icon"}
            disabled={meal.name == undefined || meal.name.length == 0}
            onClick={() => {
              addMeal({
                data: {
                  name: meal.name ?? "",
                  ingredientId: meal.ingredients.map(
                    (entry) => entry.value ?? ""
                  ),
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
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AddMeal;
