import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { api } from "~/utils/api";

interface RemoveIngredientMealType {
  mealId: string;
  ingredientId: string;
}

function RemoveIngredientMeal({
  mealId,
  ingredientId,
}: RemoveIngredientMealType) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate: deleteEntry } = api.meals.deleteIngredient.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: () => {
      void ctx.meals.getIngredients.invalidate({ data: { id: mealId } });
    },
  });
  return (
    <div className="flex justify-end">
      <Button
        key={`dim-${mealId}-${ingredientId}`}
        className="h-8 w-8 p-0"
        variant={"outline"}
        onClick={() => {
          deleteEntry({ data: { mealId, ingredientId } });
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
        ) : (
          <Trash2 className="h-4 w-4 " />
        )}
      </Button>
    </div>
  );
}

export default RemoveIngredientMeal;
