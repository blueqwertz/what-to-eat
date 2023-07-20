import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { Check, Loader2, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function AddIngredient() {
  const [ingredient, setIngredient] = useState<{
    name: string;
  }>({
    name: "",
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate: addIngredient } = api.ingredients.addEntry.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: (e) => {
      setLoading(false);
    },
    onSuccess: () => {
      void ctx.ingredients.getAll.invalidate();
      setLoading(false);
      setChecked(true);
      setTimeout(() => {
        setChecked(false);
      }, 800);
      setIngredient({
        name: "",
      });
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Hinzufügen
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-3 w-[300px]">
        <div className="flex gap-1">
          <Input
            placeholder="Zutat"
            value={ingredient.name}
            className="w-auto"
            onChange={(e) => {
              setIngredient((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
          <Button
            variant={"outline"}
            className="h-10 w-10 p-0"
            disabled={Object.values(ingredient).some(
              (value) => value === undefined || value === ""
            )}
            onClick={() => {
              addIngredient({
                data: {
                  name: ingredient.name ?? "",
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

export default AddIngredient;
