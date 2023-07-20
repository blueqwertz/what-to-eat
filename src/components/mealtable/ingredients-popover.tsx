import * as React from "react";
import { api } from "~/utils/api";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import IngredientCombo from "./add-ingredient-combo";
import { unitMap } from "~/utils/enumMaps";
import { Unit } from "@prisma/client";
import RemoveIngredientMeal from "./remove-ingredient-meal";

type IngredientPopoverType = {
  id: string;
  name: string;
};

function IngredientPopover({ id, name }: IngredientPopoverType) {
  const {
    data: [ingredientsInMeal, totalCount] = [],
    isLoading: ingredientsLoading,
  } = api.meals.getIngredients.useQuery({
    data: { id },
  });

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate: addIngredient } = api.meals.addIngredient.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: () => {
      void ctx.meals.getIngredients.invalidate({ data: { id } });
      setLoading(false);
      setChecked(true);
      setTimeout(() => {
        setChecked(false);
      }, 800);
    },
  });

  const [ingredient, setIngredient] = React.useState<{
    ingredientId: string | undefined;
    count: number | undefined;
    unit: Unit | undefined;
  }>({
    ingredientId: undefined,
    count: 0,
    unit: Unit.GRAMM,
  });

  if (ingredientsLoading) {
    return (
      <Button className="h-8 w-8 p-0" variant={"outline"}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 w-full truncate py-0" variant={"outline"}>
          {(totalCount ?? 0) < 10 ? totalCount : "9+"}{" "}
          {totalCount == 1 ? "Zutat" : "Zutaten"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-1.5rem)] rounded-lg">
        <DialogHeader>
          <DialogTitle>Zutaten für {name}</DialogTitle>
          <DialogDescription>
            Sieh dir an welche Zutaten in diesem Gericht sind oder füge welche
            hinzu.
          </DialogDescription>
        </DialogHeader>
        <Table className="max-w-full overflow-hidden rounded-lg">
          <TableBody>
            {ingredientsInMeal?.map((entry) => {
              return (
                <TableRow key={entry.ingredient.id}>
                  <TableCell className="py-3 font-medium">
                    {entry.ingredient.name}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* {entry.count} {unitMap[entry.unit]} */}
                      <RemoveIngredientMeal
                        mealId={entry.mealId}
                        ingredientId={entry.ingredientId}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <IngredientCombo
                  value={ingredient.ingredientId}
                  setValue={(value: string | undefined) => {
                    setIngredient((prev) => {
                      return {
                        ...prev,
                        ingredientId: value,
                      };
                    });
                  }}
                  filter={ingredientsInMeal}
                />
              </TableCell>
              <TableCell className="flex items-center justify-end gap-1">
                {/* <Input
                  className="w-[100px]"
                  value={ingredient.count ?? ""}
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setIngredient((prev) => {
                      return {
                        ...prev,
                        count: !!parseInt(e.target.value)
                          ? parseInt(e.target.value)
                          : undefined,
                      };
                    });
                  }}
                /> */}
                {/* <Select
                  value={ingredient.unit}
                  onValueChange={(value: Unit) => {
                    setIngredient((prev) => {
                      return {
                        ...prev,
                        unit: value,
                      };
                    });
                  }}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="..." className="truncate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GRAMM">g</SelectItem>
                    <SelectItem value="MILLILITER">ml</SelectItem>
                    <SelectItem value="SPOONS">Lö.</SelectItem>
                    <SelectItem value="PIECES">St.</SelectItem>
                  </SelectContent>
                </Select> */}
                <Button
                  className="my-1 h-8 w-8 p-0"
                  variant={"outline"}
                  disabled={Object.values(ingredient).some(
                    (value) => value === undefined
                  )}
                  onClick={() => {
                    addIngredient({
                      data: {
                        mealId: id,
                        ingredientId: ingredient.ingredientId ?? "",
                        count: ingredient.count ?? 0,
                        unit: ingredient.unit ?? Unit.GRAMM,
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default IngredientPopover;
