import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";

function RemoveIngredient({ id }: { id: string }) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate: deleteEntry } = api.ingredients.deleteEntry.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: () => {
      void ctx.ingredients.getAll.invalidate();
      void ctx.meals.getIngredients.invalidate();
      setLoading(false);
    },
  });
  return (
    <div className="flex justify-end">
      <Button
        key={`ri-${id}`}
        className="h-8 w-8 p-0"
        variant={"outline"}
        onClick={() => {
          deleteEntry({ data: { id } });
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

export default RemoveIngredient;
